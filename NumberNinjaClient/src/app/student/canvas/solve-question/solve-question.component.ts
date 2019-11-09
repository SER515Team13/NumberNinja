import { Component, OnInit } from '@angular/core';
declare var Blockly: any;

@Component({
  selector: 'app-solve-question',
  templateUrl: './solve-question.component.html',
  styleUrls: ['./solve-question.component.css']
})
export class SolveQuestionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const blocklyDiv = document.getElementById('blocklyDiv');

    var workspace = Blockly.inject(blocklyDiv, {
      readOnly: false,
      grid: {
        spacing: 20,
        length: 20,
        colour: '#ccc',
        snap: true
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
      },
      move: {
        scrollbars: true,
        drag: true,
        wheel: true
      },
      toolbox: `
      <xml xmlns="https://developers.google.com/blockly/xml" id="toolbox-simple" style="display: none">
        <category name="NUMBERS" colour="342">
          <label text="Numbers"></label>
          <block type="math_number">
            <field name="NUM">0</field>
          </block>
          <sep gap="5"></sep>
          <block type="math_number">
            <field name="NUM">1</field>
          </block>
          <sep gap="5"></sep>
          <block type="math_number">
            <field name="NUM">2</field>
          </block>
          <sep gap="5"></sep>
          <block type="math_number">
            <field name="NUM">3</field>
          </block>
          <sep gap="5"></sep>
          <block type="math_number">
            <field name="NUM">4</field>
          </block>
          <sep gap="5"></sep>
          <block type="math_number">
            <field name="NUM">5</field>
          </block>
          <sep gap="5"></sep>
          <block type="math_number">
            <field name="NUM">6</field>
          </block>
          <sep gap="5"></sep>
          <block type="math_number">
            <field name="NUM">7</field>
          </block>
          <sep gap="5"></sep>
          <block type="math_number">
            <field name="NUM">8</field>
          </block>
          <sep gap="5"></sep>
          <block type="math_number">
            <field name="NUM">9</field>
          </block>
          <sep gap="5"></sep>
          <block type="math_number">
            <field name="NUM">10</field>
          </block>
          <sep gap="32"></sep>
        </category>
        <category name="OPERATORS" colour="400">
          <label text="Operators"></label>
          <block type="math_arithmetic">
            <field name="OP">ADD</field>
          </block>
          <sep gap="5"></sep>
          <block type="math_arithmetic">
            <field name="OP">MINUS</field>
          </block>
          <sep gap="5"></sep>
          <block type="math_arithmetic">
            <field name="OP">MULTIPLY</field>
          </block>
          <sep gap="5"></sep>
          <block type="math_arithmetic">
            <field name="OP">DIVIDE</field>
          </block>
        </category>
        
      </xml>
        `
    } /*as Blockly.BlocklyOptions*/);

    function myUpdateFunction(event) {
      var code = Blockly.JavaScript.workspaceToCode(workspace);
      console.log(code);
      document.getElementById("textarea").innerText = code;
    }
    workspace.addChangeListener(myUpdateFunction);
  }
}