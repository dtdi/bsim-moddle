'use strict';


var readFile = require('../../helper').readFile,
    createModdle = require('../../helper').createModdle;


describe('read', function() {

  describe('should read extensions', function() {

    var moddle;

    beforeEach(function() {
      moddle = createModdle();
    });


    describe('camunda:async', function() {

      it('on ServiceTask', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/serviceTask-camunda-async.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ServiceTask', function(err, serviceTask) {

          // then
          expect(serviceTask).to.jsonEqual({
            $type: 'bpmn:ServiceTask',
            async: true
          });

          done(err);
        });

      });


      it('on SignalEventDefinition', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/signalEventDefinition-camunda-async.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:SignalEventDefinition', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:SignalEventDefinition',
            async: true
          });

          done(err);
        });

      });

    });


    describe('camunda:errorCodeVariable', function() {

      it('on ErrorEventDefinition', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/errorEventDefinition-camunda-errorCodeVariable.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ErrorEventDefinition', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:ErrorEventDefinition',
            errorCodeVariable: 'errorCode'
          });

          done(err);
        });

      });

    });


    describe('camunda:escalationCodeVariable', function() {

      it('on EscalationEventDefinition', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/escalationEventDefinition-camunda-escalationCodeVariable.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:EscalationEventDefinition', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:EscalationEventDefinition',
            escalationCodeVariable: 'escalationCode'
          });

          done(err);
        });

      });

    });


    it('camunda:script', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-script.part.bpmn');

      // when
      moddle.fromXML(xml, 'camunda:Script', function(err, script) {

        // then
        expect(script).to.jsonEqual({
          $type: 'camunda:Script',
          scriptFormat: 'groovy',
          resource: 'null',
          value: 'foo = bar;'
        });

        done(err);
      });
    });


    it('camunda:connector', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-connector.part.bpmn');

      // when
      moddle.fromXML(xml, 'camunda:Connector', function(err, connector) {

        // then
        expect(connector).to.jsonEqual({
          $type: 'camunda:Connector',
          connectorId: 'connector',
          inputOutput: {
            $type: 'camunda:InputOutput',
            inputParameters: [
              {
                $type: 'camunda:InputParameter',
                name: 'in'
              }
            ],
            outputParameters: [
              {
                $type: 'camunda:OutputParameter',
                name: 'out'
              }
            ]
          }
        });

        done(err);
      });
    });


    it('camunda:properties', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-properties.part.bpmn');

      // when
      moddle.fromXML(xml, 'camunda:Properties', function(err, properties) {

        // then
        expect(properties).to.jsonEqual({
          $type: 'camunda:Properties',
          values: [
            {
              $type: 'camunda:Property'
            }
          ]
        });

        done(err);
      });
    });


    it('camunda:potentialStarter', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-potentialStarter.part.bpmn');

      // when
      moddle.fromXML(xml, 'camunda:PotentialStarter', function(err, starter) {

        // then
        expect(starter).to.jsonEqual({
          $type: 'camunda:PotentialStarter',
          resourceAssignmentExpression: {
            $type: 'bpmn:ResourceAssignmentExpression',
            expression: {
              $type: 'bpmn:FormalExpression',
              body: 'group2, group(group3), user(user3)'
            }
          }
        });

        done(err);
      });
    });


    it('camunda:in', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-in.part.bpmn');

      // when
      moddle.fromXML(xml, 'camunda:In', function(err, binding) {

        // then
        expect(binding).to.jsonEqual({
          $type: 'camunda:In',
          sourceExpression: 'fooExp',
          source: 'foo',
          target: 'bar',
          variables: 'all',
          local: true
        });

        done(err);
      });
    });


    it('camunda:out', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-out.part.bpmn');

      // when
      moddle.fromXML(xml, 'camunda:Out', function(err, binding) {

        // then
        expect(binding).to.jsonEqual({
          $type: 'camunda:Out',
          sourceExpression: 'fooExp',
          source: 'foo',
          target: 'bar',
          variables: 'all',
          local: true
        });

        done(err);
      });
    });


    describe('camunda:inputParameter', function() {

      it('with body content', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-inputParameter-body.part.bpmn');

        // when
        moddle.fromXML(xml, 'camunda:InputParameter', function(err, parameter) {

          // then
          expect(parameter).to.jsonEqual({
            $type: 'camunda:InputParameter',
            name: 'foo',
            value: 'BAR'
          });

          done(err);
        });
      });


      it('with nested script', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-inputParameter-script.part.bpmn');

        // when
        moddle.fromXML(xml, 'camunda:InputParameter', function(err, parameter) {

          // then
          expect(parameter).to.jsonEqual({
            $type: 'camunda:InputParameter',
            definition: {
              $type: 'camunda:Script'
            }
          });

          done(err);
        });
      });


      it('with nested list', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-inputParameter-list.part.bpmn');

        // when
        moddle.fromXML(xml, 'camunda:InputParameter', function(err, parameter) {

          // then
          expect(parameter).to.jsonEqual({
            $type: 'camunda:InputParameter',
            name: 'var1',
            definition: {
              $type: 'camunda:List',
              items: [
                {
                  $type: 'camunda:Value',
                  value: '${1+1}'
                },
                {
                  $type: 'camunda:Value',
                  value: '${1+2}'
                },
                {
                  $type: 'camunda:Value',
                  value: '${1+3}'
                }
              ]
            }
          });

          done(err);
        });
      });


      it('with nested map', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-inputParameter-map.part.bpmn');

        // when
        moddle.fromXML(xml, 'camunda:InputParameter', function(err, parameter) {

          // then
          expect(parameter).to.jsonEqual({
            $type: 'camunda:InputParameter',
            definition: {
              $type: 'camunda:Map',
              entries: [
                {
                  $type: 'camunda:Entry',
                  key: 'a',
                  value: '${1+1}'
                },
                {
                  $type: 'camunda:Entry',
                  key: 'b',
                  value: '${1+2}'
                },
                {
                  $type: 'camunda:Entry',
                  key: 'c',
                  value: '${1+3}'
                }
              ]
            }
          });

          done(err);
        });
      });

    });


    describe('camunda:outputParameter', function() {

      it('with mixed contents', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-outputParameter-mixed.part.bpmn');

        // when
        moddle.fromXML(xml, 'camunda:OutputParameter', function(err, parameter) {

          // then
          expect(parameter).to.jsonEqual({
            $type: 'camunda:OutputParameter',
            name: 'var1',
            definition: {
              $type: 'camunda:List',
              items: [
                {
                  $type: 'camunda:Value',
                  value: 'constantStringValue'
                },
                {
                  $type: 'camunda:Value',
                  value: '${ \'elValue\' }'
                },
                {
                  $type: 'camunda:Script',
                  scriptFormat: 'Groovy',
                  value: 'return "scriptValue";'
                }
              ]
            }
          });

          done(err);
        });
      });

    });


    it('bpmn:CallActivity', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/callActivity.part.bpmn');

      // when
      moddle.fromXML(xml, 'bpmn:CallActivity', function(err, callActivity) {

        // then
        expect(callActivity).to.jsonEqual({
          $type: 'bpmn:CallActivity',
          calledElementBinding: 'version',
          calledElementVersion: 1,
          caseRef: 'oneTaskCase',
          caseBinding: 'version',
          caseVersion: 2
        });

        done(err);
      });

    });


    it('camunda:jobPriority', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/process-camunda-jobPriority.part.bpmn');

      // when
      moddle.fromXML(xml, 'bpmn:Process', function(err, proc) {

        // then
        expect(proc).to.jsonEqual({
          $type: 'bpmn:Process',
          jobPriority: 100
        });

        done(err);
      });

    });


    describe('bpmn:ScriptTask', function() {

      it('extended with camunda:resource, camunda:resultVariable', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/scriptTask.part.bpmn');

        // when
        moddle.fromXML(xml, 'bpmn:ScriptTask', function(err, definition) {

          // then
          expect(definition).to.jsonEqual({
            $type: 'bpmn:ScriptTask',
            scriptFormat: 'python',
            resource: 'some-file.py',
            resultVariable: 'result'
          });

          done(err);
        });
      });

    });


    it('camunda:formData', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-formData.part.bpmn');

      // when
      moddle.fromXML(xml, 'camunda:FormData', function(err, formData) {

        // then
        expect(formData).to.jsonEqual({
          $type: 'camunda:FormData',
          fields: [
            {
              $type: 'camunda:FormField',
              id: 'stringField',
              label: 'String Field',
              type: 'string',
              defaultValue: 'someString',
              properties: {
                $type: 'camunda:Properties',
                values: [
                  {
                    $type: 'camunda:Property',
                    id: 'p1',
                    value: 'property1'
                  },
                  {
                    $type: 'camunda:Property',
                    id: 'p2',
                    value: 'property2'
                  }
                ]
              },
              validation: {
                $type: 'camunda:Validation',
                constraints: [
                  {
                    $type: 'camunda:Constraint',
                    name: 'readonly'
                  },
                  {
                    $type: 'camunda:Constraint',
                    name: 'minlength',
                    config: '5'
                  }
                ]
              },
              values: [
                {
                  $type: 'camunda:Value',
                  id: 'a',
                  name: 'A'
                },
                {
                  $type: 'camunda:Value',
                  id: 'b',
                  name: 'B'
                }
              ]
            }
          ]
        });

        done(err);
      });

    });


    it('camunda:formProperty', function(done) {
      // given
      var xml = readFile('test/fixtures/xml/camunda-formProperty.part.bpmn');

      // when
      moddle.fromXML(xml, 'camunda:FormProperty', function(err, formProperty) {

        // then
        expect(formProperty).to.jsonEqual({
          $type: 'camunda:FormProperty',
          id: 'longProperty',
          name: 'Property',
          type: 'long',
          required: 'true',
          readable: 'true',
          writable: 'true',
          variable: 'SpeakerName',
          expression: '#{address.street}',
          datePattern: 'dd-MM-yyyy hh:mm',
          default: '42'
        });

        done(err);
      });
    });


    describe('camunda:executionListener', function() {

      it('attributes', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-executionListener.part.bpmn');

        // when
        moddle.fromXML(xml, 'camunda:ExecutionListener', function(err, executionListener) {

          // then
          expect(executionListener).to.jsonEqual({
            $type: 'camunda:ExecutionListener',
            event: 'start',
            'class': 'my.company.Listener'
          });

          done(err);
        });

      });


      it('script', function(done) {

        // given
        var xml = readFile('test/fixtures/xml/camunda-executionListener-script.part.bpmn');

        // when
        moddle.fromXML(xml, 'camunda:ExecutionListener', function(err, executionListener) {

          // then
          expect(executionListener).to.jsonEqual({
            $type: 'camunda:ExecutionListener',
            event: 'start',
            script: {
              $type: 'camunda:Script',
              scriptFormat: 'groovy',
              value: 'foo = bar;'
            }
          });

          done(err);
        });
      });

    });


    it('camunda:taskListener', function(done) {

      // given
      var xml = readFile('test/fixtures/xml/camunda-taskListener.part.bpmn');

      // when
      moddle.fromXML(xml, 'camunda:TaskListener', function(err, taskListener) {

        // then
        expect(taskListener).to.jsonEqual({
          $type: 'camunda:TaskListener',
          event: 'create',
          class: 'org.camunda.bpm.engine.test.bpmn.usertask.UserTaskTestCreateTaskListener',
          delegateExpression: '${myTaskListener}',
          expression: '${myTaskListener.notify(task, task.eventName)}'
        });

        done(err);
      });
    });

  });

});