let startTime, elapsedTime = 0, timerInterval;
        let running = false;

        function timeToString(time) {
            let date = new Date(time);
            let minutes = date.getUTCMinutes().toString().padStart(2, '0');
            let seconds = date.getUTCSeconds().toString().padStart(2, '0');
            let milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
            return `${minutes}:${seconds}.${milliseconds}`;
        }

        function startPause() {
            if (!running) {
                startTime = Date.now() - elapsedTime;
                timerInterval = setInterval(() => {
                    elapsedTime = Date.now() - startTime;
                    document.getElementById("display").textContent = timeToString(elapsedTime);
                }, 10);
                document.getElementById("startPause").textContent = "Pause";
            } else {
                clearInterval(timerInterval);
                document.getElementById("startPause").textContent = "Start";
            }
            running = !running;
        }

        function reset() {
            clearInterval(timerInterval);
            running = false;
            elapsedTime = 0;
            document.getElementById("display").textContent = "00:00:00.000";
            document.getElementById("startPause").textContent = "Start";
            document.getElementById("laps").innerHTML = "";
        }

        function lap() {
            if (running) {
                let lapTime = timeToString(elapsedTime);
                let lapItem = document.createElement("li");
                lapItem.textContent = lapTime;
                document.getElementById("laps").appendChild(lapItem);
            }
        }

        document.getElementById("startPause").addEventListener("click", startPause);
        document.getElementById("reset").addEventListener("click", reset);
        document.getElementById("lap").addEventListener("click", lap);