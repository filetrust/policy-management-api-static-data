#!/usr/bin/env node
import { program } from "commander";
import AzureFileShareService from "./services/azureFileShareService";
import StaticDataService from "./services/staticDataService";

const start = () => {
  program
    .requiredOption("-s, --share <share>", "Share Name - default is 'policies'", "policies")
    .requiredOption("-a, --account <account>", "Azure Storage Account")
    .requiredOption("-k, --key <key>", "Azure Storage Account Key")
    .requiredOption("-n, --number <number>", "Number of historical policies to generate")
    .parse(process.argv);

  const azureFileShareService = new AzureFileShareService(program.account, program.key, program.share);

  const staticDataService = new StaticDataService(azureFileShareService, parseInt(program.number));

  staticDataService.Generate().then(() => {
    console.log("Generation has completed.");
  }, reason => {
    throw reason;
  });
}

start();