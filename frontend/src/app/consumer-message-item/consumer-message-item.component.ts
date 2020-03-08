import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { SyntaxHighlightService } from '../syntax-highlight.service';
import { Constants } from '../app.constant';
import * as _ from 'lodash';
import { TooltipPosition } from '@angular/material';

@Component({
  selector: 'app-consumer-message-item',
  templateUrl: './consumer-message-item.component.html',
  styleUrls: ['./consumer-message-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConsumerMessageItemComponent implements OnInit, OnChanges {
  
  @Input('message') currentMessage: {};
  codeMirrorMode: string = "text/plain";
  prettyPrintToggle: boolean = false;
  codeMirrorOptions: {};
  message: {};
  tooltipPosition: TooltipPosition = "above";

  constructor(private syntaxHighlightService: SyntaxHighlightService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    console.log('init')
    this.message = _.cloneDeep(this.currentMessage);
    this.setCodeMirrorOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.message = _.cloneDeep(changes.currentMessage.currentValue);
    this.setCodeMirrorOptions();
    this.beautify(false);
  }

  setCodeMirrorOptions() {
    this.codeMirrorOptions = {
        theme: 'solarized',
        mode: this.codeMirrorMode,
        lineNumbers: true,
        lineWrapping: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        autoCloseBrackets: true,
        matchBrackets: true,
        matchTags: true,
        autoCloseTags: true,
        lint: true,
        readOnly: true
      };
  }
  
  copyToClipboard() {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (this.message['value']));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }

  beautify(toggle = true) {
    if(toggle)
      this.prettyPrintToggle = !this.prettyPrintToggle;
    let highlight;
    if(this.prettyPrintToggle) {
      highlight = this.syntaxHighlightService.highlight(this.message['value']);
    }
    else {
      highlight = this.syntaxHighlightService.removeHighlight(this.message['value']);
    }
    this.codeMirrorMode = Constants.MESSAGE_TYPES.filter(type => type.name == highlight.type)[0].value;
    this.message['value'] = highlight.value;
    this.setCodeMirrorOptions();
    this.cdRef.detectChanges();
  }
}
