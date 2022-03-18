class Player {
    constructor() {}
}

function game(pemain, dadu) {
    const [n, m] = [pemain, dadu];
    const players = [];
    [...new Array(n)].map((e, i) => {
        players.push({
            name: i,
            dadu: m,
            point: 0,
        });
    });
    let finish = false;
    let giliran = 1;
    while (!finish) {
        console.log(`Giliran ${1} lempar dadu : `);
        let hasil_lemparan = [];
        players.forEach((v, i) => {
            let lemparan = [];
            for (let i = 0; i < v.dadu; i++) {
                lemparan.push(Math.round(Math.random() * (6 - 1 + 1)) + 1);
            }
            hasil_lemparan.push(lemparan);
        });
        players.forEach((v, i) => {
            console.log(`\tPemain #${i} (${v.point}) : ${hasil_lemparan[i].join(",")}`);
        });
        console.log(`Setelah Evaluasi : `);
        var tmp = hasil_lemparan.map(function (arr) {
            return arr.slice();
        });
        players.forEach((v, i) => {
            hasil_lemparan[i].forEach(function (j, k) {
                if (j == 6) {
                    players[i].dadu--;
                    players[i].point++;
                    tmp[i][k] = null;
                } else if (j == 1) {
                    tmp[i][k] = null;
                    if (i == players.length - 1) {
                        players[0].dadu++;
                        tmp[0].push(1);
                    } else {
                        players[i + 1].dadu++;
                        tmp[i + 1].push(1);
                    }
                }
            });
            tmp[i] = tmp[i].filter((e) => e != null);
            console.log(`\tPemain #${i} (${v.point}) : ${tmp[i].join(",")}`);
        });
        let next = [];
        players.forEach((v, i) => {
            if (v.dadu > 0) next.push(v);
        });
        if (next.length == 1) {
            finish = true;
            console.log(`Game berakhir karena hanya pemain #${next[0].name} yang memiliki dadu`);
            console.log(
                `Game dimenangkan oleh pemain #${
                    players.sort((a, b) => a.point - b.point)[players.length - 1].name
                } karena memiliki point lebih banyak dari pemain lainnya `
            );
        }
        console.log("\n");
    }
    // console.log(JSON.stringify(players));
}
game(5, 3);
