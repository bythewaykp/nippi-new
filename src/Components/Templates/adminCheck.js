module.exports = (id, chat) => {
    // return true
    for (let k of chat.participants) {
        if (id == k.id._serialized && k.isAdmin) {
            return true;
        } else if (id == k.id._serialized && !k.isAdmin) {
            return false;
        }
    }
};
