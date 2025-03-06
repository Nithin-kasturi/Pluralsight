const request = require('supertest');
const express = require('express');

// Import the app from your main server file
const app = require('./app');  // Adjust this to your file structure

// Test Suite for the Express Application
describe('GET /', () => {
  it('should return Hello world', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello world');
  });
});

describe('GET /name', () => {
  it('should return Kasturi Nithin', async () => {
    const response = await request(app).get('/name');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Kasturi Nithin');
  });
});
