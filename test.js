main();
const observer = new MutationObserver(main);
const targetNode = document.body;
const config = {
    attributes: true,
};
observer.observe(targetNode, config);

function main() {
    const res = [];
    for (let e of document.getElementsByClassName("css-1dbjc4n")) {
        if (e.tagName === "SECTION") {
            res.push(e);
        }
    }
    const tl = res[0].children[1];
    const tweets = tl.children[0].children;
    getVotesAndItems(tweets);
}

function getVotesAndItems(tweets) {
    for (let i = 0; i < tweets.length; i++) {
        const tweet = tweets[i];
        if (tweet.innerHTML.indexOf(`testid="cardPoll"`) !== -1) {
            if (
                tweet.children[0].children[0].children[0].children[0]
                    .children[0].children[0].children[1].children[1]
                    .children[1] !== undefined &&
                tweet.children[0].children[0].children[0].children[0]
                    .children[0].children[0].children[1].children[1].children[1]
                    .children[1].children[0].children[0].children[0]
                    .children[0] !== undefined
            ) {
                const items =
                    tweet.children[0].children[0].children[0].children[0]
                        .children[0].children[0].children[1].children[1]
                        .children[1].children[1].children[0].children[0]
                        .children[0].children[0].children[0].children[0]
                        .children;
                const votes = Number(
                    tweet.children[0].children[0].children[0].children[0].children[0].children[0].children[1].children[1].children[1].children[1].children[0].children[0].children[0].children[0].children[0].children[1].children[0].children[0].children[0].innerText
                        .replaceAll(",", "")
                        .replaceAll(" votes", "")
                        .replaceAll("票", "")
                );
                insertEachItemVotes2Tweets(votes, items);
            } else if (
                tweet.children[0].children[0].children[0].children[0]
                    .children[0].children[0].children[2] !== undefined
            ) {
                const items =
                    tweet.children[0].children[0].children[0].children[0]
                        .children[0].children[0].children[2].children[1]
                        .children[0].children[0].children[0].children[0]
                        .children[0].children[0].children;
                const votes = Number(
                    tweet.children[0].children[0].children[0].children[0].children[0].children[0].children[2].children[1].children[0].children[0].children[0].children[0].children[0].children[1].children[0].children[0].children[0].innerText
                        .replaceAll(",", "")
                        .replaceAll(" votes", "")
                        .replaceAll("票", "")
                );
                insertEachItemVotes2Tweets(votes, items);
            }
        }
    }
}

function insertEachItemVotes2Tweets(votes, items) {
    console.log("www");
    if (votes !== NaN) {
        for (const item of items) {
            if (
                item.children[0] !== undefined &&
                item.children[0].children[2].children[0].children[0].innerText.indexOf(
                    "("
                ) === -1
            ) {
                const percentage = Number(
                    item.children[0].children[2].children[0].children[0].innerText.split(
                        "%"
                    )[0]
                );
                item.children[0].children[2].children[0].children[0].innerText += `(${
                    votes * (percentage / 100)
                }票)`;
            }
        }
    }
}
