//var expect = require("../expect").expect;

var createModdle = require("../helper").createModdle;

describe("bsimmoddle", function () {
  var moddle = createModdle();

  describe("parsing", function () {
    it("should publish type", function () {
      // when
      var type = moddle.getType("bsim:simulationConfiguration");

      // then
      expect(type).to.exist;
      expect(type.$descriptor).to.exist;
    });

    it("should have display name", function () {
      // when
      var type = moddle.getType("bsim:simulationConfiguration");

      // then
      expect(type).to.exist;

      var descriptor = type.$descriptor;

      expect(
        descriptor.propertiesByName["bsim:processInstances"].meta.displayName
      ).to.exist;
      expect(
        descriptor.propertiesByName["bsim:processInstances"].meta.displayName
      ).to.eql("Number of Process Instances");
    });
  });

  describe("creation", function () {
    it("should create Definitions", function () {
      var definitions = moddle.create("bsim:definitions");

      expect(definitions.$type).to.eql("bsim:definitions");
    });

    it("should create BranchingProbability", function () {
      var sequenceFlow = moddle.create("bsim:BranchingProbability");

      expect(sequenceFlow.$type).to.eql("bsim:BranchingProbability");
    });

    it("should create SimulationConfiguration", function () {
      var process = moddle.create("bsim:simulationConfiguration");

      expect(process.$type).to.eql("bsim:simulationConfiguration");
    });
    /** 
    it("should create SubProcess", function () {
      var subProcess = moddle.create("bsim:SubProcess");

      expect(subProcess.$type).to.eql("bsim:SubProcess");
      expect(subProcess.$instanceOf("bsim:InteractionNode")).to.be.true;
    });

    describe("defaults", function () {
      it("should init Gateway", function () {
        var gateway = moddle.create("bsim:Gateway");

        expect(gateway.gatewayDirection).to.eql("Unspecified");
      });

      it("should init BPMNShape", function () {
        var bsimEdge = moddle.create("bsimdi:BPMNEdge");

        expect(bsimEdge.messageVisibleKind).to.eql("initiating");
      });

      it("should init EventBasedGateway", function () {
        var gateway = moddle.create("bsim:EventBasedGateway");

        expect(gateway.eventGatewayType).to.eql("Exclusive");
      });

      it("should init CatchEvent", function () {
        var event = moddle.create("bsim:CatchEvent");

        expect(event.parallelMultiple).to.eql(false);
      });

      it("should init ParticipantMultiplicity", function () {
        var participantMultiplicity = moddle.create(
          "bsim:ParticipantMultiplicity"
        );

        expect(participantMultiplicity.minimum).to.eql(0);
        expect(participantMultiplicity.maximum).to.eql(1);
      });

      it("should init Activity", function () {
        var activity = moddle.create("bsim:Activity");

        expect(activity.startQuantity).to.eql(1);
        expect(activity.completionQuantity).to.eql(1);
      });
    });
    */
  });

  describe("property access", function () {
    describe("singleton properties", function () {
      it("should set attribute", function () {
        // given
        var process = moddle.create("bsim:task");

        // assume
        expect(process.get("id")).not.to.exist;

        // when
        process.set("id", "asdf");

        // then
        expect(process).to.jsonEqual({
          $type: "bsim:task",
          id: "asdf",
        });
      });

      it("should set attribute (ns)", function () {
        // given
        var process = moddle.create("bsim:BranchingProbability");

        // when
        process.set("bsim:value", 0.8);

        // then
        expect(process).to.jsonEqual({
          $type: "bsim:BranchingProbability",
          value: 0.8,
        });
      });

      /** 
      it('should set id attribute', function() {

        // given
        var definitions = moddle.create('bsim:Definitions');

        // when
        definitions.set('id', 10);

        // then
        expect(definitions).to.jsonEqual({
          $type: 'bsim:Definitions',
          id: 10
        });
      });
      */
    });

    describe("builder", function () {
      it("should create simple hierarchy", function () {
        // given
        var definitions = moddle.create("bsim:definitions");
        var simulationConfigurations = definitions.get(
          "bsim:simulationConfiguration"
        );

        var simulationConfiguration = moddle.create(
          "bsim:simulationConfiguration"
        );

        // when
        simulationConfigurations.push(simulationConfiguration);

        // then
        expect(simulationConfigurations).to.eql([simulationConfiguration]);
        expect(definitions.simulationConfiguration).to.eql([
          simulationConfiguration,
        ]);

        expect(definitions).to.jsonEqual({
          $type: "bsim:definitions",
          simulationConfiguration: [{ $type: "bsim:simulationConfiguration" }],
        });
      });

      it("should create simple hierarchy 2", function () {
        // given
        var definitions = moddle.create("bsim:simulationConfiguration");

        var task = moddle.create("bsim:task");
        var gateway = moddle.create("bsim:exclusiveGateway");

        // when
        definitions.get("tasks").push(task);
        definitions.get("gateways").push(gateway);

        // then
        //expect(definitions).to.eql([task, gateway]);
        expect(definitions.tasks).to.eql([task]);
        expect(definitions.gateways).to.eql([gateway]);
        /**
        expect(definitions).to.jsonEqual({
          $type: "bsim:simulationConfiguration",
          gateways: [
            {
              $type: "bsim:exclusiveGateway",
            },
          ],
          tasks: [
            {
              $type: "bsim:task",
            },
          ],
        });*/
    
      });
    });
  });
});
