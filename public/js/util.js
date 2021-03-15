function KtoF(k) {
    return Math.floor((k - 273.15) * 1.8 + 32);
}

function KtoC(k) {
    return Math.floor(k - 273.15);
}

function FtoK(f) {
    return Math.floor(((f-32)/1.8)+273.15);
}

function FtoC(f) {
    return Math.round((f -32) * 5 / 9);
}

function CtoF(c) {
    return Math.round(c * 9 / 5 + 32);
}

const weekDays = function(index) {
    const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Satuday", "Sunday"];
    return week[index];
}