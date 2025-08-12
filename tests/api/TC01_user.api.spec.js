const { test, expect, request } = require('@playwright/test');

test('Create booking, then delete with auth token', async () => {
    const baseURL = 'https://restful-booker.herokuapp.com';
    const apiContext = await request.newContext();

    // Generate token
    const authResponse = await apiContext.post(`${baseURL}/auth`, {
        headers: { 'Content-Type': 'application/json' },
        data: {
            username: 'admin',
            password: 'password123',
        },
    });

    const authBody = await authResponse.json();
    const token = authBody.token;
    console.log('Generated token:', token);
    expect(token).toBeTruthy();

    // Create booking
    const createResponse = await apiContext.post(`${baseURL}/booking`, {
        headers: { 'Content-Type': 'application/json' },
        data: {
            firstname: 'Micgael',
            lastname: 'Julies',
            totalprice: 500,
            depositpaid: true,
            bookingdates: {
                checkin: '2025-01-01',
                checkout: '2025-01-10',
            },
            additionalneeds: 'Breakfast',
        },
    });

    const createBody = await createResponse.json();
    const bookingId = createBody.bookingid;
    console.log('Created booking ID:', bookingId);
    expect(bookingId).toBeTruthy();

    // Delete booking
    const deleteResponse = await apiContext.delete(`${baseURL}/booking/${bookingId}`, {
        headers: {
            Cookie: `token=${token}`,
            'Content-Type': 'application/json',
        },
    });

    console.log('Delete status:', deleteResponse.status());
    expect(deleteResponse.status()).toBe(201); // Expect 201 or 200
});