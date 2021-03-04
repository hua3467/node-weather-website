function KtoF(k) {
    return Math.floor((k - 273.15) * 1.8 + 32);
}

function KtoC(k) {
    return Math.floor(k - 273.15);
}

const weekDays = function(index) {
    const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Satuday", "Sunday"];
    return week[index];
}