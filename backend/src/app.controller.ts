import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getMeta() {
    return {
      name: "游戏记账",
      version: "1.0.0",
    };
  }
}
