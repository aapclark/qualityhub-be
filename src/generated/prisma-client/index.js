"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Chat",
    embedded: false
  },
  {
    name: "Message",
    embedded: false
  },
  {
    name: "Listing",
    embedded: false
  },
  {
    name: "ListingIndustry",
    embedded: false
  },
  {
    name: "ListingTag",
    embedded: false
  },
  {
    name: "ListingAvailability",
    embedded: false
  },
  {
    name: "Job",
    embedded: false
  },
  {
    name: "CoachFeedback",
    embedded: false
  },
  {
    name: "FeedbackEntry",
    embedded: false
  },
  {
    name: "JobBooking",
    embedded: false
  },
  {
    name: "SeekerReview",
    embedded: false
  },
  {
    name: "SeekerReviewResponse",
    embedded: false
  },
  {
    name: "Microservice",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `${process.env["PRISMA_ENDPOINT"]}`,
  secret: `${process.env["PRISMA_SECRET"]}`
});
exports.prisma = new exports.Prisma();
