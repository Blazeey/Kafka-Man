import { Injectable } from '@angular/core';
import * as jsyaml from 'js-yaml';

@Injectable()
export class SyntaxHighlightService {

    public jsonSyntaxHighlight(json: string) {
        if (json == '')
            return '';
        return JSON.stringify(JSON.parse(json),null,4);
    }

    public xmlSyntaxHighlight(xml: string) {
        var reg = /(>)\s*(<)(\/*)/g; // updated Mar 30, 2015
        var wsexp = / *(.*) +\n/g;
        var contexp = /(<.+>)(.+\n)/g;
        xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
        var pad = 0;
        var formatted = '';
        var lines = xml.split('\n');
        var indent = 0;
        var lastType = 'other';
        // 4 types of tags - single, closing, opening, other (text, doctype, comment) - 4*4 = 16 transitions 
        var transitions = {
            'single->single': 0,
            'single->closing': -1,
            'single->opening': 0,
            'single->other': 0,
            'closing->single': 0,
            'closing->closing': -1,
            'closing->opening': 0,
            'closing->other': 0,
            'opening->single': 1,
            'opening->closing': 0,
            'opening->opening': 1,
            'opening->other': 1,
            'other->single': 0,
            'other->closing': -1,
            'other->opening': 0,
            'other->other': 0
        };

        for (var i = 0; i < lines.length; i++) {
            var ln = lines[i];

            // Luca Viggiani 2017-07-03: handle optional <?xml ... ?> declaration
            if (ln.match(/\s*<\?xml/)) {
                formatted += ln + "\n";
                continue;
            }
            // ---

            var single = Boolean(ln.match(/<.+\/>/)); // is this line a single tag? ex. <br />
            var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
            var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)
            var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
            var fromTo = lastType + '->' + type;
            lastType = type;
            var padding = '';

            indent += transitions[fromTo];
            for (var j = 0; j < indent; j++) {
                padding += '\t';
            }
            if (fromTo == 'opening->closing')
                formatted = formatted.substr(0, formatted.length - 1) + ln + '\n'; // substr removes line break (\n) from prev loop
            else
                formatted += padding + ln + '\n';
        }

        return formatted;
    };

    public rawJson(json: string) {
        if (json == '')
            return '';
        return JSON.stringify(JSON.parse(json));
    }

    public rawXml(xml: string) {
        return xml.replace(/(\r\n|\n|\r)/gm, " ").replace(/>\s+</g,'><');
    }

    public validMessage(type: string, message: string) {
        try {
            switch(type) {
                case 'json':
                    JSON.parse(message);
                    break;
                case 'yaml':
                    let d = jsyaml.safeLoad(message)
                    break;
                case 'xml':
                    var oParser = new DOMParser();
                    var oDOM = oParser.parseFromString(message, "text/xml");
                    if (oDOM.getElementsByTagName('parsererror').length > 0) {
                        return false;
                    }
                    break;
                default:
                    break;
            }
        }
        catch {
            return false;
        }
        return true;
    }

    public highlight(value) {
        if(value == '') 
            return { type: 'text', value: value };
        else if(this.validMessage('json', value))
            return { type: 'json', value: this.jsonSyntaxHighlight(value) }
        else if(this.validMessage('xml', value))
            return { type: 'xml', value: this.xmlSyntaxHighlight(value) }
        else if(this.validMessage('yaml', value))
            return { type: 'yaml', value: value }
        else 
            return { type: 'text', value: value }
    }

    public removeHighlight(value) {
        if(value == '') value;
        else if(this.validMessage('json', value))
            value = this.rawJson(value);
        else if(this.validMessage('xml', value))
            value = this.rawXml(value);
        else value;
        
        return { type: 'text', value: value };
    }
}