const Quiz = {
    validate(user, correct) {
        return user.trim().toLowerCase() === correct.trim().toLowerCase();
    }
};
