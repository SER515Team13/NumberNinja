import { Component, OnInit } from '@angular/core';
import * as Blockly from 'blockly';


@Component({
  selector: 'app-solve-question',
  templateUrl: './solve-question.component.html',
  styleUrls: ['./solve-question.component.css']
})
export class SolveQuestionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const blocklyDiv = document.getElementById('blocklyDiv');

    Blockly.inject(blocklyDiv, {
      readOnly: false,
      move: {
        scrollbars: true,
        drag: true,
        wheel: true
      },
      toolbox: `
      <xml xmlns="https://developers.google.com/blockly/xml" id="toolbox-simple" style="display: none">
        <block type="controls_ifelse"></block>
        <block type="logic_compare"></block>
        <block type="logic_operation"></block>
        <block type="controls_repeat_ext">
            <value name="TIMES">
                <shadow type="math_number">
                    <field name="NUM">10</field>
                </shadow>
            </value>
        </block>
        <block type="logic_operation"></block>
        <block type="logic_negate"></block>
        <block type="logic_boolean"></block>
        <block type="logic_null" disabled="true"></block>
        <block type="logic_ternary"></block>
        <block type="text_charAt">
            <value name="VALUE">
                <block type="variables_get">
                    <field name="VAR">text</field>
                </block>
            </value>
        </block>
        <block type="math_arithmetic">
        <field name="OP">ADD</field>
        <value name="A">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="B">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      </xml>
        `
    } as Blockly.BlocklyOptions);
  }
}
