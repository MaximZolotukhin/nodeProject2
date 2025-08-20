#!/usr/bin/env node
import { getArgs } from './helpers/args.js'

const initCLI = () => {
  const args = getArgs(process.argv)
  if (args.h) {
    //вывод хелп
  }
  if (args.s) {
    //сохранить город
  }
  if (args.t) {
    //сохранить токен
  }

  //вывести погоду

  console.log(args)
}

initCLI()
