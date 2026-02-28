function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhoneNumber(phone: string): boolean {
    const re = /^\+?[1-9]\d{1,14}$/;
    return re.test(phone);
}

export { validateEmail, validatePhoneNumber };