const $form = document.querySelector(".form");
const $guess = document.querySelector("#guess");
const $result = document.querySelector(".result");
const $prev_guess = document.querySelector(".prev-guess");
const $result_message = document.querySelector(".result .message");
const $result_description = document.querySelector(".result .description");
const $retry_button = document.querySelector(".retry-button");
const correct_value = Math.floor(Math.random() * 100) + 1;
console.log(correct_value);
const guess_arr = [];

const initGame = () => {
    $result.classList.remove("active");
    $retry_button.classList.remove("active");
    $result_message.classList.remove("correct");
    guess_arr.length = 0;
    $guess.disabled = false;
};

initGame();

$retry_button.addEventListener("click", () => {
    initGame();
});

$form.addEventListener("submit", (e) => {
    e.preventDefault();
    $result.classList.add("active");
    const guess_value = Number($guess.value);
    $guess.value = "";
    if (isNaN(guess_value)) {
        $result_message.textContent = "数字を入力して下さい!";
        $result_description.textContent =
            "数字ではない入力がされました。数字を入力して下さい。";
        return;
    }
    guess_arr.push(guess_value);
    $prev_guess.textContent = guess_arr.join(" ");
    if (guess_value === correct_value) {
        $result_message.textContent = "正解です！";
        $result_description.textContent = `正解です。${guess_arr.length}回で正解できました。`;
        $result_message.classList.add("correct");
        $guess.disabled = true;
        $retry_button.classList.add("active");
        return;
    }
    if (guess_arr.length >= 10) {
        $result_message.textContent = "ゲームオーバー";
        $result_description.textContent = "10回で正解できませんでした。";
        $guess.disabled = true;
        $retry_button.classList.add("active");
        return;
    }
    $result_message.textContent = "間違いです!";
    if (guess_value < correct_value) {
        $result_description.textContent =
            "今の予想は小さすぎです!もっと大きな数字です。";
        return;
    }
    if (guess_value > correct_value) {
        $result_description.textContent =
            "今の予想は大きすぎです!もっと小さな数字です。";
        return;
    }
    throw new Error("実装を見直して下さい");
});
