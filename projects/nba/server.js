const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');
const WebSocket = require('ws');
const sqlite3 = require('sqlite3').verbose();
const cron = require('node-cron');

const app = express();
const PORT = 3000;
const db = new sqlite3.Database('players.db');
