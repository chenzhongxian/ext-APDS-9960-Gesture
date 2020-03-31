enum GESTURE {
  //% block="DIR_NONE"
  DIR_NONE,
  //% block="DIR_LEFT"
  DIR_LEFT,
  //% block="DIR_RIGHT"
  DIR_RIGHT,
  //% block="DIR_UP"
  DIR_UP,
  //% block="DIR_DOWN"
  DIR_DOWN,
  //% block="DIR_NEAR"
  DIR_NEAR,
  //% block="DIR_FAR"
  DIR_FAR
}

//% color="#1296db" iconWidth=40 iconHeight=40
namespace apds9960 {
  //% block="gesture sensor initliallize SCL [SCL] SDA [SDA]" blockType="command"
  //% SDA.shadow="dropdown" SDA.options="SDA"
  //% SCL.shadow="dropdown" SCL.options="SCL"
  export function init(parameter: any, block: any) {
    // let intpin = parameter.INTPIN.code;
    let sda = parameter.SDA.code;
    let scl = parameter.SCL.code;
    Generator.addInclude("includeWire", "#include <Wire.h>");
    Generator.addInclude(
      "includeSparkFun_APDS9960",
      "#include <SparkFun_APDS9960.h>"
    );
    Generator.addObject(
      "apdsObject",
      "SparkFun_APDS9960",
      `apds = SparkFun_APDS9960();`
    );
    // Generator.addInclude("isrflag", "int isr_flag = 0;");
    // Generator.addInclude(
    //   "interruptRoutine",
    //   "void interruptRoutine() {\n\tisr_flag = 1;\n}"
    // );
    // Generator.addSetup(
    //   `attachInterruptSetup_${intpin}`,
    //   `attachInterrupt(digitalPinToInterrupt(${intpin}), interruptRoutine, FALLING);`
    // );
    Generator.addSetup(`initSetup`, `apds.init();`);
    Generator.addSetup(
      `enableGestureSensorSetup`,
      `apds.enableGestureSensor(true);`
    );
  }

  //% block="gesture available?" blockType="boolean"
  export function isGestureAvailable(parameter: any, block: any) {
    Generator.addCode("apds.isGestureAvailable()");
  }

  //% block="read gesture" blockType="reporter"
  export function readGesture(parameter: any, block: any) {
    Generator.addCode(`apds.readGesture()`);
  }

  //% block="gesture type [GESTURE]" blockType="reporter"
  //% GESTURE.shadow="dropdown" GESTURE.options="GESTURE" GESTURE.defl="GESTURE.DIR_LEFT"
  export function gesture(parameter: any, block: any) {
    let gesture = parameter.GESTURE.code;
    Generator.addCode( `${gesture}`);
  }

  // //% block="gesture is [GESTURE]" blockType="boolean"
  // //% GESTURE.shadow="dropdown" GESTURE.options="GESTURE" GESTURE.defl="GESTURE.DIR_LEFT"
  // export function gestureIs(parameter: any, block: any) {
  //   let gesture = parameter.GESTURE.code;
  //   Generator.addCode(`apds.readGesture() == ${gesture}`);
  // }

  // //% block="reset interupt" blockType="command"
  // export function resetInterupt(parameter: any, block: any) {
  //   Generator.addCode(`isr_flag = 0;`);
  // }
}
