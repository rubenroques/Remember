var sentences = [
    "Doesn't look like anything to me",
    "What door?",
];

var images = [
];

function diffDiv(date1, date2, div) {
    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.floor(difference_ms / div);
}

function diff(date1, date2) {
    var one_month  = 1000*60*60*24*30;
    var one_day    = 1000*60*60*24;
    var one_hour   = 1000*60*60;
    var one_minute = 1000*60;
    var one_second = 1000;

    var ret = {
        months:  diffDiv(date1, date2, one_month),
        days:    diffDiv(date1, date2, one_day),
        hours:   diffDiv(date1, date2, one_hour)   % 24,
        minutes: diffDiv(date1, date2, one_minute) % 60,
        seconds: diffDiv(date1, date2, one_second) % 60
    };

    return ret;
}

function setNumber(id, number) {
    document.querySelector("#" + id).innerHTML = ("0" + number).slice(-2);
}

function randomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function refresh() {
    var final_date = new Date(2018, 02, 15, 0, 0, 0, 0);
    var init_date  = new Date();

    var d = diff(init_date, final_date);

    setNumber("timer_months", d.months);
    setNumber("timer_days", d.days);
    setNumber("timer_hours", d.hours);
    setNumber("timer_minute", d.minutes);
    setNumber("timer_seconds", d.seconds);
}

function countDownCycle() {
    refresh();
    setTimeout(countDownCycle, 1000);
}

function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, callback);
    } else {
        element["on" + eventName] = callback;
    }
}

function setThings() {
    // Write text
    var alt = document.querySelector("#alt_text-span");
    alt.innerHTML = randomFromArray(sentences);

    // Add image
    // var image = document.querySelector("#image");
    // image.src = randomFromArray(images);
}

function load() {
    setThings();
    countDownCycle();
}
