import { join } from 'path'
import { promises } from 'fs'
import slackapi from '@slack/web-api'

const { readFile, readdir } = promises
const { WebClient } = slackapi

const client = new WebClient()

async function run() {
  const images = await readdir('images')

  const selection = Math.floor(Math.random() * images.length)

  const image = await readFile(join('images', images[selection]))

  try {
    client.users.setPhoto({
      image,
      token: process.env.SLACK_USER_TOKEN,
    })

    console.log(`Updated profile picture to images/${images[selection]}`)
  } catch (err) {
    console.error(err)
  }
}

run()

setInterval(run, process.env.INTERVAL || 10 * 60 * 1000)

