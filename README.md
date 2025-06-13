<a href="">
  <img alt="Auction Website" src="/public/demo.png">
  <h1 align="center">Realtime Auctioning Website</h1>
</a>

<p align="center">
  A personal project that interfaces with supabase and S3 buckets to deliver real time auctioning features.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
</p>
<br/>

## Features

- Realtime updates on auction items from database with millisecond precision.
- Uses websocket server to only use 1 connection to database at a time.
- Interfaces with S3 buckets to reduce storage costs on server.

## Summary

This is a passion project that I wanted to work on to teach myself more how front-end development works. I knew that I wanted to work with TypeScript and NodeJS to eventually self-host my sown services for fun. I added WebSockets as a way to add a layer of security, not allowing users to interact with the database itself so that I can authenticate all transactions since this is going to be a project that deals with realtime and money.

The project will need to be ran in conjunction with the separate websocket server microservice. I designed it that way because I eventually would like the websocket server to be scalable, not that it matters right now.
