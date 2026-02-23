module.exports = {
    changeAction: function(creep, action, emoji, isPublic) {
        if (creep.memory.action != action) {
            creep.say(emoji, isPublic);
            creep.memory.action = action;
        }
    }
};