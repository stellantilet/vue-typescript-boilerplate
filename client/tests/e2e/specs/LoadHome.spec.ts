import {
  ACTUALS_LOADHOMESPEC_PATH,
  BASE_HOMELINK_VIEW_FIXTURE,
  LOCALHOST_URL,
  ACTUAL_HOMELINK_VIEW_FIXTURE,
  DIFF_HOMELINK_FIXTURE_WRITEPATH_PARTIAL,
} from "../../constants";

import { PNG, PNGWithMetadata } from "pngjs";
import pixelmatch from "pixelmatch";
// import pixelmatch from "pixelmatch";

let baselinePng: PNGWithMetadata;
let actualPng: PNGWithMetadata;
let diff: PNG;
let matchNum = 123;

describe("Check-the-nav-bar-for-the-correct-nav-links", () => {
  it("runs the delete actual png task plugin", () => {
    cy.task("deleteActuals", ACTUALS_LOADHOMESPEC_PATH).then((dirOrNull) => {
      console.log(dirOrNull);
    });
  });

  it("visit's home page", () => {
    cy.visit(LOCALHOST_URL);
  });
  // it("checks the home link", () => {
  //   cy.get("a.link").contains("Home").should("have.length", 1);
  // });
  // it("checks the login link", () => {
  //   cy.get("a.link").contains("Login").should("have.length", 1);
  // });
  // it("checks the signup link", () => {
  //   cy.get("a.link").contains("Signup").should("have.length", 1);
  // });
  it("screenshots-the-home-view-window", () => {
    cy.get("a.link").contains("Home").screenshot();
  });
});

describe("regression-test-home-link", () => {
  it("get the baseline png of home link", () => {
    cy.fixture(
      /screenshots-the-home-view-window.png/g.test(BASE_HOMELINK_VIEW_FIXTURE)
        ? BASE_HOMELINK_VIEW_FIXTURE
        : "not found"
    )
      .then(Cypress.Blob.base64StringToBlob)
      .then(async (fileBlob: Blob) => {
        const fileArrayBuffer = await fileBlob.arrayBuffer();
        baselinePng = PNG.sync.read(
          Buffer.from(new Uint8Array(fileArrayBuffer))
        );
        console.log("baseline png", baselinePng);
      });
  });

  it("get the actual baseline png of the home link", () => {
    cy.fixture(
      /screenshots-the-home-view-window.png/.test(ACTUAL_HOMELINK_VIEW_FIXTURE)
        ? ACTUAL_HOMELINK_VIEW_FIXTURE
        : "not found"
    )
      .then(Cypress.Blob.base64StringToBlob)
      .then(async (fileBlob: Blob) => {
        const fileArrayBuffer = await fileBlob.arrayBuffer();
        actualPng = PNG.sync.read(Buffer.from(new Uint8Array(fileArrayBuffer)));
        console.log("actual png", actualPng);
      });
  });

  it("write the diff to disk", () => {
    console.log("write diff task args", {
      testName: "LoadHome.spec.ts",
      writePath: DIFF_HOMELINK_FIXTURE_WRITEPATH_PARTIAL,
    });

    cy.task("writeDiff", {
      testName: "LoadHome.spec.ts",
      writePath: DIFF_HOMELINK_FIXTURE_WRITEPATH_PARTIAL,
    }).then((resultOrNull) => {
      console.log("write diff result", resultOrNull);
    });
  });

  it("calculate the diff between base and actual", () => {
    const { width, height } = baselinePng;
    diff = new PNG({ width, height });
    console.log("diff image", diff);
    const threshold = 0.1;

    matchNum = pixelmatch(
      baselinePng.data,
      actualPng.data,
      diff.data,
      width,
      height,
      { threshold }
    );

    console.log("\x1b[33m", "match num value", matchNum, "\x1b[00m");

    if (matchNum === 0) {
      //run the delete diff task since the pictures match we dont need to see the diff image.
      cy.task("deleteDiff", "LoadHome.spec.ts");
    }

    expect(matchNum).to.equal(0);
  });
});
