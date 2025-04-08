document.addEventListener('DOMContentLoaded', () => {
    // 必須項目の初期値
    const baseConfig = {
        initialCost: 140000, // 音声生成(4万) + 動作生成(10万)
        monthlyBase: 3000,    // 音声生成システムの基本月額
        period: 4            // 基本開発期間（週）
    };

    // オプション項目の設定
    const options = {
        avatar: {
            initialCost: 0,
            monthlyCost: 5000,
            period: 0
        },
        motion: {
            initialCost: 100000, // 10万円
            monthlyCost: 0,
            period: 1
        },
        background: {
            initialCost: 100000,
            monthlyCost: 0,
            period: 2
        },
        upscale: {
            initialCost: 100000,
            monthlyCost: 0,
            period: 2
        }
    };

    // 実行環境の設定
    const environments = {
        runpod: {
            monthlyCost: 50000
        },
        colab: {
            monthlyCost: 2500
        }
    };

    // 要素の取得
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not([disabled])');
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    const initialCostElement = document.querySelector('.initial-cost');
    const monthlyCostElement = document.querySelector('.monthly-cost');
    const developmentPeriodElement = document.querySelector('.development-period');

    // 概算見積もりの更新
    function updateCostSummary() {
        let totalInitialCost = baseConfig.initialCost;
        let totalMonthlyCost = baseConfig.monthlyBase;
        let maxPeriod = baseConfig.period;

        // オプション項目の計算
        checkboxes.forEach(checkbox => {
            if (checkbox.checked && options[checkbox.id]) {
                totalInitialCost += options[checkbox.id].initialCost;
                totalMonthlyCost += options[checkbox.id].monthlyCost;
                maxPeriod = Math.max(maxPeriod, maxPeriod + options[checkbox.id].period);
            }
        });

        // 実行環境の計算
        radioButtons.forEach(radio => {
            if (radio.checked && environments[radio.id]) {
                totalMonthlyCost += environments[radio.id].monthlyCost;
            }
        });

        // 表示の更新
        initialCostElement.textContent = `${(totalInitialCost / 10000).toFixed(1)}万円～`;
        monthlyCostElement.textContent = totalMonthlyCost >= 10000 
            ? `${(totalMonthlyCost / 10000).toFixed(1)}万円～`
            : `${totalMonthlyCost.toLocaleString()}円～`;
        developmentPeriodElement.textContent = `${maxPeriod}週間～`;
    }

    // イベントリスナーの設定
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateCostSummary);
    });

    radioButtons.forEach(radio => {
        radio.addEventListener('change', updateCostSummary);
    });

    // 初期表示の更新
    updateCostSummary();
});
