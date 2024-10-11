const request = require('supertest');
const express = require('express');
const app = require('../server');

describe('API Routes', () => {
    it('should return landing page', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('<h1>D56 - API</h1>');
    });

    it('should return JSON data', async () => {
        const res = await request(app).get('/json');
        expect(res.statusCode).toEqual(200);
        expect(res.headers['content-type']).toMatch(/json/);
    });

    it('should return XML data', async () => {
        const res = await request(app).get('/xml');
        expect(res.statusCode).toEqual(200);
        expect(res.headers['content-type']).toMatch(/xml/);
    });

    it('should return CSV data', async () => {
        const res = await request(app).get('/csv');
        expect(res.statusCode).toEqual(200);
        expect(res.headers['content-type']).toMatch(/csv/);
    });

    it('should handle errors', async () => {
        const res = await request(app).get('/nonexistent');
        expect(res.statusCode).toEqual(404);
    });
});