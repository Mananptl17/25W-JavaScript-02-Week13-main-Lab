/* Variables
-------------------------------------------------- */
const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');

// STEP 1d: Create and insert an <img> element to hold the RoboHash image
const roboImage = document.createElement('img');
roboImage.alt = "Battery Avatar";
document.body.appendChild(roboImage); // Appending the image to the body of the page

/* Functions
-------------------------------------------------- */
function updateBatteryStatus(battery) {
    console.log(battery);

    // Update the charging status
    chargeStatus.textContent = battery.charging ? "Charging..." : "Discharging...";

    // Calculate battery level percentage
    const batteryPercentage = Math.round(battery.level * 100);

    // Update the charge level and progress bar
    chargeLevel.textContent = batteryPercentage + "%";
    chargeMeter.value = batteryPercentage;

    // Set RoboHash image based on battery level
    roboImage.src = `https://robohash.org/${batteryPercentage}.png`; // Corrected string interpolation with backticks
}

// Get battery info
navigator.getBattery().then(battery => {
    console.log(battery);
    updateBatteryStatus(battery);

    // Event listeners
    battery.addEventListener("chargingchange", () => updateBatteryStatus(battery));
    battery.addEventListener("levelchange", () => updateBatteryStatus(battery));
});