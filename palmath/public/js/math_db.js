// shared math database and dynamic content generators for PaLMath

const MATH_DB = {
    // 1. Concept database for specific chapters
    getConceptDetails: function(revision, level, grade, semester, chapterName) {
        const cleanName = chapterName.replace(/\[.*\]\s*/g, '').replace(/^\d+\.\s*/g, '').trim();

        // 1-1. Fraction Division (초6-1/6-2)
        if (cleanName.includes('분수의 나눗셈')) {
            return {
                concept: `
                    <strong>1. (분수) ÷ (자연수)</strong><br>
                    • 분수의 분자를 자연수로 나누어 계산합니다. 분자가 자연수로 나누어떨어지지 않을 때는 분수의 크기를 키우거나 나눗셈을 곱셈으로 바꾸어 계산합니다.<br>
                    • 공식: $\\frac{a}{b} \\div c = \\frac{a}{b \\times c}$ (단, $c \\neq 0$)<br>
                    • 예: $\\frac{4}{5} \\div 2 = \\frac{4 \\div 2}{5} = \\frac{2}{5}$<br><br>
                    
                    <strong>2. (분수) ÷ (분수)</strong><br>
                    • 나누는 분수의 분모와 분자를 바꾸어 곱셈으로 나타내어 계산합니다.<br>
                    • 공식: $\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}$<br>
                    • 예: $\\frac{3}{4} \\div \\frac{1}{2} = \\frac{3}{4} \\times \\frac{2}{1} = 2$
                `,
                quiz: {
                    q: "다음 중 계산 결과가 1보다 작은 나눗셈의 번호를 고르시오. (정답 2개)",
                    options: [
                        "3/4 ÷ 1/2",
                        "2/5 ÷ 3/4",
                        "7/8 ÷ 9/10",
                        "5/6 ÷ 2/3",
                        "4/5 ÷ 1/4"
                    ],
                    ans: "2,3",
                    solution: "2번: $\\frac{2}{5} \\div \\frac{3}{4} = \\frac{8}{15} < 1$, 3번: $\\frac{7}{8} \\div \\frac{9}{10} = \\frac{35}{36} < 1$ 입니다. 1, 4, 5번은 결과가 1보다 큽니다."
                }
            };
        }

        // 1-2. Rectangular prism volume and surface area (초6-1)
        if (cleanName.includes('직육면체의 부피와 겉넓이')) {
            return {
                concept: `
                    <strong>1. 직육면체의 부피</strong><br>
                    • 직육면체의 부피는 밑면의 넓이에 높이를 곱하여 구합니다.<br>
                    • 공식: $\\text{부피} = \\text{가로} \\times \\text{세로} \\times \\text{높이}$<br>
                    <svg width="180" height="120" style="display:block; margin: 10px auto;">
                      <defs>
                        <linearGradient id="prismGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stop-color="rgba(124, 58, 237, 0.2)" />
                          <stop offset="100%" stop-color="rgba(124, 58, 237, 0.05)" />
                        </linearGradient>
                      </defs>
                      <line x1="25" y1="80" x2="25" y2="25" stroke="#7c3aed" stroke-width="1" stroke-dasharray="3,3" />
                      <line x1="25" y1="80" x2="115" y2="80" stroke="#7c3aed" stroke-width="1" stroke-dasharray="3,3" />
                      <line x1="25" y1="80" x2="60" y2="105" stroke="#7c3aed" stroke-width="1" stroke-dasharray="3,3" />
                      <polygon points="60,50 150,50 150,105 60,105" fill="url(#prismGrad1)" stroke="#7c3aed" stroke-width="1.5" />
                      <polygon points="60,50 150,50 115,25 25,25" fill="url(#prismGrad1)" stroke="#7c3aed" stroke-width="1.5" />
                      <polygon points="150,50 150,105 115,80 115,25" fill="url(#prismGrad1)" stroke="#7c3aed" stroke-width="1.5" />
                      <line x1="60" y1="105" x2="150" y2="105" stroke="#7c3aed" stroke-width="1.5" />
                      <line x1="150" y1="105" x2="115" y2="80" stroke="#7c3aed" stroke-width="1.5" />
                      <line x1="115" y1="80" x2="115" y2="25" stroke="#7c3aed" stroke-width="1.5" />
                      <text x="100" y="118" fill="#4c1d95" font-weight="bold" font-size="11">가로</text>
                      <text x="140" y="93" fill="#4c1d95" font-weight="bold" font-size="11">세로</text>
                      <text x="35" y="80" fill="#4c1d95" font-weight="bold" font-size="11">높이</text>
                    </svg>
                    • 단위: $1\\text{cm}^3$ (세 모서리의 길이가 각각 $1\\text{cm}$인 정육면체의 부피)<br><br>
                    
                    <strong>2. 직육면체의 겉넓이</strong><br>
                    • 여섯 면의 넓이의 합으로 구합니다. 마주 보는 세 쌍의 면이 각각 합동이므로 세 면의 넓이의 합에 2배를 곱해 계산할 수 있습니다.<br>
                    • 공식: $\\text{겉넓이} = (\\text{가로} \\times \\text{세로} + \\text{세로} \\times \\text{높이} + \\text{가로} \\times \\text{높이}) \\times 2$
                `,
                quiz: {
                    q: "가로 5cm, 세로 4cm, 높이 3cm인 직육면체의 부피와 겉넓이를 바르게 짝지은 것을 고르시오. (정답 없음이 포함됨)",
                    options: [
                        "부피: 60cm³, 겉넓이: 90cm²",
                        "부피: 60cm³, 겉넓이: 94cm²",
                        "부피: 55cm³, 겉넓이: 94cm²",
                        "부피: 50cm³, 겉넓이: 80cm²",
                        "정답 없음"
                    ],
                    ans: "2",
                    solution: "부피 $= 5 \\times 4 \\times 3 = 60\\text{cm}^3$ 이고, 겉넓이 $= (5\\times 4 + 4\\times 3 + 5\\times 3) \\times 2 = 94\\text{cm}^2$ 입니다."
                }
            };
        }

        // 1-3. Cylinder, Cone, Sphere (초6-2)
        if (cleanName.includes('원기둥') || cleanName.includes('구') || cleanName.includes('원뿔')) {
            return {
                concept: `
                    <strong>1. 원기둥 (Cylinder)</strong><br>
                    • 위와 아래의 면이 평행하고 합동인 원으로 이루어진 기둥 모양의 입체도형입니다.<br>
                    • 공식: $\\text{부피} = \\pi r^2 h$, $\\text{겉넓이} = 2\\pi r^2 + 2\\pi r h$<br>
                    <svg width='140' height='120' style='display:block; margin: 10px auto;'>
                      <ellipse cx='70' cy='25' rx='30' ry='10' fill='rgba(124, 58, 237, 0.2)' stroke='#7c3aed' stroke-width='1.5'/>
                      <path d='M40,25 L40,95 A30,10 0 0,0 100,95 L100,25' fill='rgba(124, 58, 237, 0.1)' stroke='#7c3aed' stroke-width='1.5'/>
                      <ellipse cx='70' cy='95' rx='30' ry='10' fill='none' stroke='#7c3aed' stroke-width='1.5' stroke-dasharray='3,3'/>
                      <line x1='70' y1='25' x2='70' y2='95' stroke='#4c1d95' stroke-width='1' stroke-dasharray='3,3'/>
                      <line x1='70' y1='25' x2='100' y2='25' stroke='#4c1d95' stroke-width='1' stroke-dasharray='2,2'/>
                      <text x='82' y='21' fill='#4c1d95' font-size='9' font-weight='bold'>r</text>
                      <text x='73' y='65' fill='#4c1d95' font-size='9' font-weight='bold'>h</text>
                    </svg><br>
                    <strong>2. 구 (Sphere)</strong><br>
                    • 공 모양의 입체도형으로, 반구의 단면이나 원을 회전하여 만듭니다.<br>
                    • 공식: $\\text{부피} = \\frac{4}{3}\\pi r^3$, $\\text{겉넓이} = 4\\pi r^2$
                `,
                quiz: {
                    q: "반지름 $r=3\\text{cm}$이고 높이 $h=10\\text{cm}$인 원기둥의 부피를 구하시오. (원주율 $\\pi = 3$으로 계산)",
                    options: [
                        "90cm³",
                        "270cm³",
                        "180cm³",
                        "360cm³",
                        "정답 없음"
                    ],
                    ans: "2",
                    solution: "원기둥 부피 공식 $= \\pi r^2 h = 3 \\times 3^2 \\times 10 = 270\\text{cm}^3$ 입니다."
                }
            };
        }

        // 1-4. Polygons and Areas (초5-1)
        if (cleanName.includes('다각형') || cleanName.includes('평행사변형')) {
            return {
                concept: `
                    <strong>1. 평행사변형의 넓이</strong><br>
                    • 평행사변형의 넓이는 밑변의 길이에 높이를 곱하여 구합니다.<br>
                    • 공식: $\\text{넓이} = \\text{밑변} \\times \\text{높이}$<br>
                    <svg width='160' height='100' style='display:block; margin: 10px auto;'>
                      <polygon points='30,15 140,15 120,80 10,80' fill='rgba(124, 58, 237, 0.15)' stroke='#7c3aed' stroke-width='1.5'/>
                      <line x1='30' y1='15' x2='30' y2='80' stroke='#ef4444' stroke-width='1' stroke-dasharray='3,3'/>
                      <text x='15' y='50' fill='#ef4444' font-size='9' font-weight='bold'>높이(h)</text>
                      <text x='55' y='93' fill='#4c1d95' font-size='9' font-weight='bold'>밑변</text>
                    </svg><br>
                    <strong>2. 삼각형의 넓이</strong><br>
                    • 공식: $\\text{넓이} = \\text{밑변} \\times \\text{높이} \\div 2$
                `,
                quiz: {
                    q: "밑변이 10cm이고 높이가 6cm인 평행사변형의 넓이를 구하시오.",
                    options: [
                        "30cm²",
                        "60cm²",
                        "80cm²",
                        "120cm²",
                        "정답 없음"
                    ],
                    ans: "2",
                    solution: "평행사변형의 넓이는 밑변 $\\times$ 높이 $= 10 \\times 6 = 60\\text{cm}^2$ 입니다."
                }
            };
        }

        // 1-5. Band and Pie Graphs (초6-1, 6-2)
        if (cleanName.includes('띠그래프') || cleanName.includes('원그래프') || cleanName.includes('여러 가지 그래프') || cleanName.includes('자료의 정리')) {
            return {
                concept: `
                    <strong>1. 띠그래프 (Band Graph)</strong><br>
                    • 전체에 대한 각 부분의 비율을 띠 모양으로 나타낸 그래프입니다.<br>
                    • 각 부분의 백분율(%)을 구하여 띠의 칸을 나눕니다.<br>
                    <svg width="220" height="60" style="display:block; margin: 10px auto;">
                      <rect x="10" y="10" width="80" height="30" fill="#7c3aed" opacity="0.8" stroke="#4c1d95" stroke-width="1.5" />
                      <rect x="90" y="10" width="60" height="30" fill="#4f46e5" opacity="0.8" stroke="#4c1d95" stroke-width="1.5" />
                      <rect x="150" y="10" width="40" height="30" fill="#db2777" opacity="0.8" stroke="#4c1d95" stroke-width="1.5" />
                      <rect x="190" y="10" width="20" height="30" fill="#94a3b8" opacity="0.8" stroke="#4c1d95" stroke-width="1.5" />
                      <text x="50" y="28" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">축구 40%</text>
                      <text x="120" y="28" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">농구 30%</text>
                      <text x="170" y="28" fill="#fff" font-size="8" font-weight="bold" text-anchor="middle">야구 20%</text>
                      <text x="200" y="28" fill="#fff" font-size="8" font-weight="bold" text-anchor="middle">기타</text>
                    </svg><br>
                    
                    <strong>2. 원그래프 (Pie Chart)</strong><br>
                    • 전체에 대한 각 부분의 비율을 원 모양으로 나타낸 그래프입니다.<br>
                    • 전체 백분율의 합은 항상 $100\\%$ 이며, 각 부채꼴의 중심각의 크기는 백분율에 비례합니다.
                `,
                quiz: {
                    q: "다음 중 띠그래프와 원그래프의 특징으로 옳지 않은 것의 번호를 모두 고르시오. (정답 2개)",
                    options: [
                        "각 부분의 비율을 쉽게 한눈에 비교할 수 있다.",
                        "전체에 대한 각 항목의 백분율의 합은 100%가 넘을 수도 있다.",
                        "원그래프에서 부채꼴의 중심각 크기는 백분율에 비례하지 않는다.",
                        "띠그래프는 가로 방향으로 띠를 나누어 표현한다.",
                        "자료의 연속적인 변화 추이를 보여주기에 가장 적합하다."
                    ],
                    ans: "2,3",
                    solution: "백분율의 합은 언제나 정확히 100%여야 하므로 2번은 거짓이며, 부채꼴 중심각의 크기는 백분율에 항상 비례하므로 3번도 거짓입니다."
                }
            };
        }

        // 1-6. Prime Factorization (중1-1)
        if (cleanName.includes('소인수분해')) {
            return {
                concept: `
                    <strong>1. 소수와 합성수</strong><br>
                    • <b>소수(Prime Number)</b>: 1보다 큰 자연수 중에서 1과 자기 자신만을 약수로 가지는 수 (예: 2, 3, 5, 7, 11...)<br>
                    • <b>합성수(Composite Number)</b>: 1보다 큰 자연수 중에서 소수가 아닌 수 (약수가 3개 이상)<br>
                    • 1은 소수도 아니고 합성수도 아닙니다.<br><br>
                    
                    <strong>2. 소인수분해의 뜻</strong><br>
                    • 자연수를 소수들만의 곱으로 나타내는 것을 말합니다.<br>
                    • 예: $12 = 2^2 \\times 3$ (소인수는 2, 3)
                `,
                quiz: {
                    q: "다음 보기 중 소수를 모두 고른 것의 번호를 고르시오.",
                    options: [
                        "1, 2, 3",
                        "2, 3, 5, 7, 9",
                        "2, 3, 5, 7, 11",
                        "3, 5, 7, 11, 13, 15",
                        "정답 없음"
                    ],
                    ans: "3",
                    solution: "9(3의 배수), 15(3과 5의 배수), 1(소수 아님)은 소수가 아닙니다. 2, 3, 5, 7, 11은 모두 소수가 맞으므로 3번이 정답입니다."
                }
            };
        }

        // 1-7. Circle Properties (중3-2)
        if (cleanName.includes('원의 성질')) {
            return {
                concept: `
                    <strong>1. 원의 중심과 현의 성질</strong><br>
                    • 원의 중심에서 현에 내린 수선은 그 현을 수직이등분합니다.<br>
                    • 한 원(또는 합동인 두 원)에서 중심으로부터 같은 거리에 있는 두 현의 길이는 같습니다.<br><br>
                    
                    <strong>2. 원주각의 성질</strong><br>
                    • 한 호에 대한 원주각의 크기는 그 호에 대한 중심각의 크기의 $\\frac{1}{2}$배 입니다.<br>
                    • 반원에 대한 원주각의 크기는 항상 $90^\\circ$ 입니다.
                `,
                quiz: {
                    q: "원주각의 크기가 $60^\\circ$ 일 때 이 호에 대한 중심각의 크기를 구하고, 반원에 대한 원주각의 크기를 바르게 짝지은 번호를 고르시오.",
                    options: [
                        "중심각: 120도, 원주각: 90도",
                        "중심각: 120도, 원주각: 180도",
                        "중심각: 30도, 원주각: 90도",
                        "중심각: 60도, 원주각: 90도",
                        "정답 없음"
                    ],
                    ans: "1",
                    solution: "중심각은 원주각의 2배이므로 $60^\\circ \\times 2 = 120^\\circ$ 이고, 반원에 대한 원주각은 항상 $90^\\circ$ 입니다."
                }
            };
        }

        // Fallback concept details
        return {
            concept: `
                <strong>1. ${cleanName}의 핵심 학습 내용</strong><br>
                • 이 단원은 ${level === 'elementary' ? '초등학교' : level === 'middle' ? '중학교' : '고등학교'} ${grade}학년 ${semester}학기 교과 과정에 해당하는 [${cleanName}] 단원입니다.<br>
                • 주요 공식과 이론을 정리하고 오답 노트를 활용해 실력을 키우세요.<br><br>
                
                <strong>2. 응용 및 심화 탐구</strong><br>
                • 기초 연산력을 다진 후, 복합 서술형 문항과 모의고사 기출문제 위주로 원리를 적용해 학습을 점검하세요.
            `,
            quiz: {
                q: `[${cleanName}] 개념 확인 체크 문제: 다음 중 수학 공부를 열심히 해야 하는 이유로 가장 타당한 것을 고르시오. (정답 2개)`,
                options: [
                    "논리적 사고력을 향상시키기 위해",
                    "문제 해결 능력을 키우기 위해",
                    "공식을 맹목적으로 암기하기 위해",
                    "계산기 없이 모든 계산을 암산하기 위해",
                    "공부를 하지 않기 위해"
                ],
                ans: "1,2",
                solution: "수학은 공식을 암기하는 암기 과목이 아니며, 논리적이고 체계적인 문제 해결력을 기르기 위해 학습합니다."
            }
        };
    },

    // 2. Test questions database generator
    getQuestionsForChapter: function(revision, level, grade, semester, chapterName) {
        const cleanName = chapterName.replace(/\[.*\]\s*/g, '').replace(/^\d+\.\s*/g, '').trim();
        let pool = [];

        // 2-1. 원기둥, 원뿔, 구 (초6-2)
        if (cleanName.includes('원기둥') || cleanName.includes('구') || cleanName.includes('원뿔') || cleanName.includes('입체도형')) {
            pool = [
                {
                    id: 1,
                    q: "다음 원기둥의 부피를 구하시오. (원주율 $\\pi$는 3으로 계산)<br><svg width='160' height='140' style='display:block; margin: 10px auto;'><defs><linearGradient id='cylGrad' x1='0%' y1='0%' x2='100%' y2='0%'><stop offset='0%' stop-color='hsl(265, 80%, 75%)' stop-opacity='0.6' /><stop offset='50%' stop-color='hsl(265, 80%, 90%)' stop-opacity='0.3' /><stop offset='100%' stop-color='hsl(265, 80%, 75%)' stop-opacity='0.6' /></linearGradient></defs><ellipse cx='80' cy='30' rx='40' ry='15' fill='rgba(124, 58, 237, 0.2)' stroke='#7c3aed' stroke-width='1.5'/><path d='M40,30 L40,110 A40,15 0 0,0 120,110 L120,30' fill='url(#cylGrad)' stroke='#7c3aed' stroke-width='1.5'/><ellipse cx='80' cy='110' rx='40' ry='15' fill='none' stroke='#7c3aed' stroke-width='1.5' stroke-dasharray='4,4'/><line x1='80' y1='30' x2='120' y2='30' stroke='#4c1d95' stroke-width='1' stroke-dasharray='2,2'/><text x='100' y='25' fill='#4c1d95' font-size='10' font-weight='bold'>r = 3cm</text><line x1='80' y1='30' x2='80' y2='110' stroke='#4c1d95' stroke-width='1' stroke-dasharray='3,3'/><text x='85' y='75' fill='#4c1d95' font-size='10' font-weight='bold'>10cm</text></svg>",
                    options: ["90cm³", "180cm³", "270cm³", "360cm³", "정답 없음"],
                    ans: "3",
                    solution: "원기둥 부피 공식 $= \\pi r^2 h = 3 \\times 3^2 \\times 10 = 270\\text{cm}^3$ 입니다.",
                    correctRate: 88.0,
                    difficulty: 1
                },
                {
                    id: 2,
                    q: "다음 반지름이 6cm인 구(Sphere)의 겉넓이를 구하시오. (원주율 $\\pi$는 3.14로 계산)<br><svg width='140' height='140' style='display:block; margin: 10px auto;'><defs><radialGradient id='sphereGrad' cx='30%' cy='30%' r='70%'><stop offset='0%' stop-color='#fff' stop-opacity='0.8'/><stop offset='50%' stop-color='hsl(265, 80%, 85%)' stop-opacity='0.4'/><stop offset='100%' stop-color='hsl(265, 80%, 55%)' stop-opacity='0.8'/></radialGradient></defs><circle cx='70' cy='70' r='50' fill='url(#sphereGrad)' stroke='#7c3aed' stroke-width='1.5'/><ellipse cx='70' cy='70' rx='50' ry='18' fill='none' stroke='#7c3aed' stroke-width='1' stroke-dasharray='3,3'/><line x1='70' y1='70' x2='120' y2='70' stroke='#4c1d95' stroke-width='1.2'/><circle cx='70' cy='70' r='2' fill='#4c1d95'/><text x='95' y='65' fill='#4c1d95' font-size='10' font-weight='bold'>6cm</text></svg>",
                    options: ["113.04cm²", "226.08cm²", "452.16cm²", "904.32cm²", "정답 없음"],
                    ans: "3",
                    solution: "구의 겉넓이 공식 $= 4 \\pi r^2 = 4 \\times 3.14 \\times 6^2 = 4 \\times 3.14 \\times 36 = 452.16\\text{cm}^2$ 입니다.",
                    correctRate: 81.2,
                    difficulty: 2
                },
                {
                    id: 3,
                    q: "원기둥을 평면으로 자를 때, 생기는 단면의 모양이 될 수 있는 것을 모두 고르시오. (정답 2개)",
                    options: ["원", "삼각형", "직사각형", "사다리꼴", "오각형"],
                    ans: "1,3",
                    solution: "원기둥을 밑면과 평행하게 자르면 원이 되고, 수직으로 자르면 직사각형이 됩니다.",
                    correctRate: 85.5,
                    difficulty: 2
                },
                {
                    id: 4,
                    q: "다음 원뿔(Cone)의 부피를 구하시오. (밑면 반지름 5cm, 높이 12cm, 원주율 $\\pi = 3$)<br><svg width='140' height='140' style='display:block; margin: 10px auto;'><polygon points='70,20 30,100 110,100' fill='rgba(124, 58, 237, 0.15)' stroke='#7c3aed' stroke-width='1.5'/><ellipse cx='70' cy='100' rx='40' ry='12' fill='rgba(124, 58, 237, 0.2)' stroke='#7c3aed' stroke-width='1.5' stroke-dasharray='3,3'/><line x1='70' y1='20' x2='70' y2='100' stroke='#ef4444' stroke-width='1' stroke-dasharray='3,3'/><line x1='70' y1='100' x2='110' y2='100' stroke='#4c1d95' stroke-width='1' stroke-dasharray='2,2'/><text x='85' y='95' fill='#4c1d95' font-size='10' font-weight='bold'>r = 5cm</text><text x='75' y='60' fill='#ef4444' font-size='10' font-weight='bold'>12cm</text></svg>",
                    options: ["100cm³", "300cm³", "400cm³", "900cm³", "정답 없음"],
                    ans: "2",
                    solution: "원뿔의 부피 공식 $= \\frac{1}{3} \\pi r^2 h = \\frac{1}{3} \\times 3 \\times 5^2 \\times 12 = 300\\text{cm}^3$ 입니다.",
                    correctRate: 77.4,
                    difficulty: 2
                },
                {
                    id: 5,
                    q: "밑면의 지름이 8cm이고 높이가 9cm인 원기둥의 부피를 구하시오. (원주율 $\\pi$는 3.14로 계산)",
                    options: ["113.04cm³", "226.08cm³", "452.16cm³", "904.32cm³", "정답 없음"],
                    ans: "3",
                    solution: "지름이 8cm이므로 반지름 $r=4\\text{cm}$입니다. 부피 $= 3.14 \\times 4^2 \\times 9 = 452.16\\text{cm}^3$ 입니다.",
                    correctRate: 74.0,
                    difficulty: 2
                }
            ];
        }

        // 2-2. 다각형의 둘레와 넓이 (초5-1)
        else if (cleanName.includes('다각형') || cleanName.includes('평행사변형') || cleanName.includes('평면도형')) {
            pool = [
                {
                    id: 1,
                    q: "다음 평행사변형의 넓이를 구하시오.<br><svg width='180' height='110' style='display:block; margin: 10px auto;'><polygon points='40,20 160,20 130,90 10,90' fill='rgba(124, 58, 237, 0.15)' stroke='#7c3aed' stroke-width='1.5'/><line x1='40' y1='20' x2='40' y2='90' stroke='#ef4444' stroke-width='1' stroke-dasharray='3,3'/><polyline points='40,83 47,83 47,90' fill='none' stroke='#ef4444' stroke-width='1'/><text x='15' y='60' fill='#ef4444' font-size='10' font-weight='bold'>h = 6cm</text><text x='70' y='103' fill='#4c1d95' font-size='10' font-weight='bold'>밑변 = 12cm</text><text x='100' y='15' fill='#4c1d95' font-size='10' font-weight='bold'>12cm</text></svg>",
                    options: ["36cm²", "72cm²", "84cm²", "96cm²", "정답 없음"],
                    ans: "2",
                    solution: "평행사변형의 넓이 공식 $= \\text{밑변} \\times \\text{높이} = 12 \\times 6 = 72\\text{cm}^2$ 입니다.",
                    correctRate: 92.0,
                    difficulty: 1
                },
                {
                    id: 2,
                    q: "다음 삼각형의 넓이를 구하시오.<br><svg width='160' height='110' style='display:block; margin: 10px auto;'><polygon points='80,20 140,90 20,90' fill='rgba(124, 58, 237, 0.15)' stroke='#7c3aed' stroke-width='1.5'/><line x1='80' y1='20' x2='80' y2='90' stroke='#ef4444' stroke-width='1' stroke-dasharray='3,3'/><text x='85' y='55' fill='#ef4444' font-size='10' font-weight='bold'>8cm</text><text x='70' y='102' fill='#4c1d95' font-size='10' font-weight='bold'>밑변 = 15cm</text></svg>",
                    options: ["30cm²", "60cm²", "120cm²", "150cm²", "정답 없음"],
                    ans: "2",
                    solution: "삼각형의 넓이 공식 $= \\text{밑변} \\times \\text{높이} \\div 2 = 15 \\times 8 \\div 2 = 60\\text{cm}^2$ 입니다.",
                    correctRate: 89.0,
                    difficulty: 1
                },
                {
                    id: 3,
                    q: "다음 사다리꼴의 넓이를 구하시오. (윗변 6cm, 아랫변 10cm, 높이 5cm)",
                    options: ["30cm²", "40cm²", "80cm²", "120cm²", "정답 없음"],
                    ans: "2",
                    solution: "사다리꼴 넓이 공식 $= (\\text{윗변} + \\text{아랫변}) \\times \\text{높이} \\div 2 = (6 + 10) \\times 5 \\div 2 = 40\\text{cm}^2$ 입니다.",
                    correctRate: 87.5,
                    difficulty: 2
                },
                {
                    id: 4,
                    q: "대각선의 길이가 각각 8cm, 12cm인 마름모의 넓이를 구하시오.",
                    options: ["48cm²", "96cm²", "120cm²", "192cm²", "정답 없음"],
                    ans: "1",
                    solution: "마름모 넓이 공식 $= \\text{한 대각선} \\times \\text{다른 대각선} \\div 2 = 8 \\times 12 \\div 2 = 48\\text{cm}^2$ 입니다.",
                    correctRate: 91.0,
                    difficulty: 1
                },
                {
                    id: 5,
                    q: "다음 평면도형 중 마주보는 한 쌍의 대변만 평행한 사각형을 모두 고르시오. (정답 2개)",
                    options: ["사다리꼴", "평행사변형", "등변사다리꼴", "마름모", "직사각형"],
                    ans: "1,3",
                    solution: "한 쌍의 대변만 평행한 사각형은 사다리꼴(1번)과 등변사다리꼴(3번)입니다. 평행사변형, 마름모, 직사각형은 두 쌍의 대변이 평행합니다.",
                    correctRate: 84.0,
                    difficulty: 2
                }
            ];
        }

        // 2-3. 여러 가지 그래프 / 띠그래프와 원그래프 (초6-1)
        else if (cleanName.includes('그래프') || cleanName.includes('자료')) {
            pool = [
                {
                    id: 1,
                    q: "다음 막대그래프는 학생들의 학급별 분포를 나타냅니다. A반과 B반의 학생 수 합을 구하시오.<br><svg width='200' height='120' style='display:block; margin: 10px auto;'><line x1='30' y1='10' x2='30' y2='100' stroke='#475569' stroke-width='1.5'/><line x1='30' y1='100' x2='190' y2='100' stroke='#475569' stroke-width='1.5'/><line x1='30' y1='70' x2='190' y2='70' stroke='#cbd5e1' stroke-width='0.5' stroke-dasharray='2,2'/><line x1='30' y1='40' x2='190' y2='40' stroke='#cbd5e1' stroke-width='0.5' stroke-dasharray='2,2'/><rect x='45' y='40' width='20' height='60' fill='hsl(265, 80%, 65%)' rx='2'/><rect x='80' y='25' width='20' height='75' fill='hsl(265, 80%, 55%)' rx='2'/><rect x='115' y='55' width='20' height='45' fill='hsl(295, 80%, 55%)' rx='2'/><rect x='150' y='70' width='20' height='30' fill='hsl(230, 80%, 65%)' rx='2'/><text x='55' y='112' fill='#475569' font-size='9' text-anchor='middle'>A반</text><text x='90' y='112' fill='#475569' font-size='9' text-anchor='middle'>B반</text><text x='125' y='112' fill='#475569' font-size='9' text-anchor='middle'>C반</text><text x='160' y='112' fill='#475569' font-size='9' text-anchor='middle'>D반</text><text x='25' y='43' fill='#475569' font-size='8' text-anchor='end'>20명</text><text x='25' y='28' fill='#475569' font-size='8' text-anchor='end'>25명</text></svg>",
                    options: ["35명", "40명", "45명", "50명", "정답 없음"],
                    ans: "3",
                    solution: "A반은 20명, B반은 25명이므로 두 반의 합은 $20 + 25 = 45$명 입니다.",
                    correctRate: 90.0,
                    difficulty: 1
                },
                {
                    id: 2,
                    q: "전체 학생 수 120명 중 축구를 좋아하는 학생이 45명일 때, 원그래프에서 이 항목이 차지하는 백분율(%)을 구하시오.",
                    options: ["25%", "30.5%", "35.5%", "37.5%", "정답 없음"],
                    ans: "4",
                    solution: "비율 $= \\frac{45}{120} \\times 100 = 37.5\\%$ 입니다.",
                    correctRate: 85.0,
                    difficulty: 2
                },
                {
                    id: 3,
                    q: "띠그래프와 원그래프의 가장 주된 공통점을 고르시오. (정답 없음 포함)",
                    options: ["시간 경과에 따른 연속적인 변화 추이를 보여준다.", "전체에 대한 각 항목의 비율을 한눈에 알아보기 쉽다.", "원주율을 이용하여 면적을 계산한다.", "지각 변동 그래프 설계에만 사용된다.", "정답 없음"],
                    ans: "2",
                    solution: "띠그래프와 원그래프는 모두 전체에 대한 각 항목의 비율을 시각화하는 대표적인 '비율 그래프'입니다.",
                    correctRate: 94.0,
                    difficulty: 1
                },
                {
                    id: 4,
                    q: "띠그래프에서 전체 백분율의 합은 항상 몇 % 가 되어야 합니까? (숫자만 입력)",
                    ans: "100",
                    solution: "전체에 대한 비율의 총합은 언제나 $100\\%$가 됩니다.",
                    correctRate: 96.0,
                    difficulty: 1
                },
                {
                    id: 5,
                    q: "원그래프에 대한 설명으로 옳은 것을 모두 고르시오. (정답 2개)",
                    options: ["전체에 대한 비율을 원 모양으로 나타낸 그래프이다.", "각 항목의 중심각 크기는 백분율에 비례한다.", "띠그래프에 비해 작은 항목을 크게 표현하기 용이하다.", "원그래프의 부채꼴 중심각의 크기는 항상 90도 이하이다.", "꺾은선그래프보다 실시간 변동 추이 묘사에 유리하다."],
                    ans: "1,2",
                    solution: "원그래프는 전체에 대한 비율을 원 모양으로 그린 것으로, 중심각 크기는 비율(백분율)에 비례합니다.",
                    correctRate: 82.5,
                    difficulty: 2
                }
            ];
        }

        // 2-4. 소인수분해 (중1-1)
        if (pool.length === 0 && cleanName.includes('소인수분해')) {
            pool = [
                { id: 1, q: "다음 중 소수가 아닌 합성수를 모두 고르시오. (정답 2개)", options: ["2", "9", "15", "17", "23"], ans: "2,3", correctRate: 92.5, difficulty: 1 },
                { id: 2, q: "자연수 72를 소인수분해 하였을 때, 소인수들의 합은 얼마입니까? (숫자만 입력)", ans: "5", solution: "$72 = 2^3 \\times 3^2$ 이므로 소인수는 2와 3입니다. 합은 $2+3=5$ 입니다.", correctRate: 88.0, difficulty: 2 },
                { id: 3, q: "다음 중 약수의 개수가 가장 많은 수의 번호를 고르시오. (정답 없음 포함)", options: ["18", "24", "32", "36", "정답 없음"], ans: "4", solution: "18은 6개, 24는 8개, 32는 6개, 36은 9개입니다. 따라서 36(4번)이 가장 많습니다.", correctRate: 84.5, difficulty: 2 },
                { id: 4, q: "자연수 120의 소인수를 모두 나열한 것을 고르시오. (정답 없음 포함)", options: ["2, 3", "2, 5", "2, 3, 5", "2, 3, 5, 7", "정답 없음"], ans: "3", solution: "$120 = 2^3 \\times 3 \\times 5$ 이므로 소인수는 2, 3, 5 입니다.", correctRate: 91.0, difficulty: 1 },
                { id: 5, q: "다음 수 중 제곱수인 것을 모두 고르시오. (정답 2개)", options: ["27", "36", "50", "64", "80"], ans: "2,4", correctRate: 86.8, difficulty: 2 }
            ];
        }

        // 2-5. 유리수와 순환소수 (중2-1)
        else if (pool.length === 0 && cleanName.includes('유리수와 순환소수')) {
            pool = [
                { id: 1, q: "다음 중 유한소수로 나타낼 수 없는 순환소수를 모두 고르시오. (정답 2개)", options: ["1/4", "3/15", "5/12", "7/18", "8/25"], ans: "3,4", correctRate: 88.0, difficulty: 2 },
                { id: 2, q: "순환소수 $0.\\dot{3}\\dot{6}$ 을 기약분수로 나타내었을 때, 분모의 값을 구하시오. (숫자만 입력)", ans: "11", solution: "$0.\\dot{3}\\dot{6} = \\frac{36}{99} = \\frac{4}{11}$ 이므로 분모는 11입니다.", correctRate: 91.5, difficulty: 2 },
                { id: 3, q: "분수 $\\frac{7}{40}$ 을 소수로 나타내면 유한소수인지 무한소수인지 고르시오. (정답 없음 포함)", options: ["유한소수", "무한소수", "순환소수", "정수가 아닌 유리수가 아님", "정답 없음"], ans: "1", solution: "$\\frac{7}{40} = \\frac{7}{2^3 \\times 5}$ 이므로 분모 소인수가 2, 5뿐이어서 유한소수입니다.", correctRate: 94.0, difficulty: 1 },
                { id: 4, q: "순환소수 $0.1\\dot{2}$ 를 분수로 고칠 때 가장 편리한 식을 고르시오.", options: ["100x - x", "100x - 10x", "10x - x", "1000x - 10x", "정답 없음"], ans: "2", solution: "$x = 0.1222...$ 이므로 $100x = 12.222...$, $10x = 1.222...$ 입니다. 두 식을 빼면 소수 부분이 사라지므로 $100x - 10x$ 가 가장 편리합니다.", correctRate: 85.0, difficulty: 2 }
            ];
        }

        // 2-6. 원의 성질 (중3-2)
        else if (pool.length === 0 && cleanName.includes('원의 성질')) {
            pool = [
                { id: 1, q: "원의 중심에서 현에 내린 수선은 그 현을 어떻게 합니까?", options: ["평행하게 만든다", "이등분한다", "삼등분한다", "길이를 늘린다", "아무 변화 없다"], ans: "2", solution: "원 중심에서 현에 그은 수선은 현을 수직이등분합니다.", correctRate: 92.5, difficulty: 1 },
                { id: 2, q: "반지름의 길이가 5인 원의 중심에서 거리가 3인 현의 길이를 구하시오. (숫자만 입력)", ans: "8", solution: "직각삼각형 피타고라스 정리에 의해 현의 반쪽 길이는 $\\sqrt{5^2 - 3^2} = 4$ 입니다. 따라서 현의 길이는 $4 \\times 2 = 8$ 입니다.", correctRate: 84.1, difficulty: 2 },
                { id: 3, q: "한 원에서 원주각의 크기는 같은 호에 대한 중심각의 크기의 몇 배입니까? (분수로 입력)", ans: "1/2", solution: "원주각의 크기는 중심각 크기의 $\\frac{1}{2}$배 입니다.", correctRate: 91.0, difficulty: 1 }
            ];
        }

        // 2-7. 삼각비 (중3-2)
        else if (pool.length === 0 && cleanName.includes('삼각비')) {
            pool = [
                { id: 1, q: "직각삼각형에서 기준각 $A$에 대하여 $\\sin A$는 무엇을 뜻합니까?", options: ["밑변 / 빗변", "높이 / 빗변", "높이 / 밑변", "빗변 / 밑변", "정답 없음"], ans: "2", solution: "$\\sin A = \\frac{\\text{높이}}{\\text{빗변}}$ 입니다. 2번이 맞습니다.", correctRate: 94.0, difficulty: 1 },
                { id: 2, q: "빗변이 5, 밑변이 4, 높이가 3인 직각삼각형에서 기준각 $A$(밑변과 빗변 사이 각)의 $\\cos A$ 값을 분수로 쓰시오.", ans: "4/5", solution: "$\\cos A = \\frac{\\text{밑변}}{\\text{빗변}} = \\frac{4}{5}$ 입니다.", correctRate: 91.0, difficulty: 1 },
                { id: 3, q: "$\\tan 45^\circ$ 의 값을 구하시오.", ans: "1", solution: "$\\tan 45^\circ = 1$ 입니다.", correctRate: 95.0, difficulty: 1 }
            ];
        }

        // 2-8. 분수의 나눗셈 (초6-1)
        else if (pool.length === 0 && cleanName.includes('분수의 나눗셈')) {
            pool = [
                { id: 1, q: "$\\frac{4}{7} \\div 2$ 의 계산 결과를 가장 간단한 기약분수로 나타내시오. (예: 2/7 형식)", ans: "2/7", solution: "$\\frac{4}{7} \\div 2 = \\frac{4 \\div 2}{7} = \\frac{2}{7}$ 입니다.", correctRate: 92.4, difficulty: 1 },
                { id: 2, q: "$\\frac{3}{5} \\div \\frac{3}{10}$ 의 값을 계산하시오.", ans: "2", solution: "$\\frac{3}{5} \\div \\frac{3}{10} = \\frac{3}{5} \\times \\frac{10}{3} = 2$ 입니다.", correctRate: 88.5, difficulty: 2 }
            ];
        }

        // 2-9. Fallback dynamic generator with rich SVG graphics (If pool empty)
        if (pool.length === 0) {
            for (let i = 1; i <= 35; i++) {
                const cVal = i * 2;
                if (i % 6 === 0) {
                    pool.push({
                        id: i,
                        q: `[${cleanName} 기하영역] 다음 원기둥의 부피를 구하시오. (밑면 반지름 $r=2$, 높이 $h=${cVal}$, 원주율 $\\pi=3$으로 계산)<br><svg width='130' height='120' style='display:block; margin: 10px auto;'><ellipse cx='65' cy='25' rx='25' ry='8' fill='rgba(124, 58, 237, 0.2)' stroke='#7c3aed' stroke-width='1.2'/><path d='M40,25 L40,95 A25,8 0 0,0 90,95 L90,25' fill='rgba(124, 58, 237, 0.1)' stroke='#7c3aed' stroke-width='1.2'/><ellipse cx='65' cy='95' rx='25' ry='8' fill='none' stroke='#7c3aed' stroke-width='1.2' stroke-dasharray='3,3'/><line x1='65' y1='25' x2='65' y2='95' stroke='#4c1d95' stroke-width='0.8' stroke-dasharray='3,3'/><line x1='65' y1='25' x2='90' y2='25' stroke='#4c1d95' stroke-width='0.8' stroke-dasharray='2,2'/><text x='74' y='21' fill='#4c1d95' font-size='8'>r=2</text><text x='68' y='65' fill='#4c1d95' font-size='8'>h=${cVal}</text></svg>`,
                        ans: String(3 * 2 * 2 * cVal),
                        solution: `원기둥 부피 공식은 $\\pi r^2 h$ 입니다. 따라서 부피는 $3 \\times 2^2 \\times ${cVal} = ${3 * 4 * cVal}$ 입니다.`,
                        correctRate: 85.0,
                        difficulty: 2
                    });
                } else if (i % 7 === 0) {
                    pool.push({
                        id: i,
                        q: `[${cleanName} 넓이측정] 다음 평행사변형의 넓이를 구하시오.<br><svg width='160' height='90' style='display:block; margin: 10px auto;'><polygon points='30,15 140,15 120,75 10,75' fill='rgba(124, 58, 237, 0.15)' stroke='#7c3aed' stroke-width='1.2'/><line x1='30' y1='15' x2='30' y2='75' stroke='#ef4444' stroke-width='0.8' stroke-dasharray='3,3'/><text x='15' y='45' fill='#ef4444' font-size='8'>h = 4cm</text><text x='50' y='86' fill='#4c1d95' font-size='8'>밑변 = ${cVal}cm</text></svg>`,
                        ans: String(cVal * 4),
                        solution: `평행사변형의 넓이는 밑변 $\\times$ 높이 입니다. 따라서 넓이는 $${cVal} \\times 4 = ${cVal * 4}\\text{cm}^2$ 입니다.`,
                        correctRate: 89.0,
                        difficulty: 2
                    });
                } else if (i % 5 === 0) {
                    pool.push({
                        id: i,
                        q: `[${cleanName} 종합평가] 다음 중 조건 $x > ${cVal}$ 을 만족하는 값을 모두 고르시오. (정답 2개)`,
                        options: [String(cVal - 5), String(cVal + 2), String(cVal - 1), String(cVal + 5), String(cVal - 10)],
                        ans: "2,4",
                        solution: `${cVal + 2}와 ${cVal + 5}는 모두 ${cVal}보다 큽니다.`,
                        correctRate: 91.0,
                        difficulty: 2
                    });
                } else if (i % 8 === 0) {
                    pool.push({
                        id: i,
                        q: `[${cleanName} 심화과정] 식 $2x - ${cVal} = 0$ 을 만족하는 자연수 $x$의 값을 고르시오. (단, 정답이 없는 경우 정답 없음을 선택)`,
                        options: [String(cVal + 2), String(cVal + 4), String(cVal + 6), String(cVal + 8), "정답 없음"],
                        ans: "5",
                        solution: "식의 근은 $x = " + (cVal / 2) + "$ 이나 선택지 1~4번에 해당 값이 존재하지 않으므로 5번(정답 없음)입니다.",
                        correctRate: 85.0,
                        difficulty: 3
                    });
                } else {
                    pool.push({
                        id: i,
                        q: `[${cleanName} 기본문항 ${i}] 다항식 $f(x) = x^2 - ${cVal}x$ 에 대하여 $f(${cVal + 3})$의 값을 구하시오.`,
                        ans: String((cVal + 3) * (cVal + 3) - cVal * (cVal + 3)),
                        solution: `f(${cVal + 3}) = (${cVal + 3})^2 - ${cVal}(${cVal + 3}) = ${cVal + 3} 입니다.`,
                        correctRate: 88.0,
                        difficulty: 2
                    });
                }
            }
        }

        // Always pad the pool up to exactly 35 questions to prevent any short-size crash (for 10, 15, 20, 30 question tests!)
        if (pool.length < 35) {
            const size = pool.length;
            const needed = 35 - size;
            for (let i = 1; i <= needed; i++) {
                const newId = size + i;
                const cVal = newId * 3;
                if (cleanName.includes('분수의 나눗셈')) {
                    const n1 = newId + 1;
                    const d1 = newId + 2;
                    const div = 2;
                    pool.push({
                        id: newId,
                        q: `[${cleanName} 복습 ${newId}] $\\frac{${n1}}{${d1}} \\div ${div}$ 의 계산 결과를 가장 간단한 기약분수로 나타내시오. (예: 2/7 형식)`,
                        ans: `${n1}/${d1 * div}`,
                        solution: `$\\frac{${n1}}{${d1}} \\div ${div} = \\frac{${n1}}{${d1} \\times ${div}} = \\frac{${n1}}{${d1 * div}}$ 입니다.`,
                        correctRate: 90.0,
                        difficulty: 1
                    });
                } else if (cleanName.includes('소인수분해')) {
                    const num = 12 * newId;
                    pool.push({
                        id: newId,
                        q: `[${cleanName} 복습 ${newId}] 자연수 ${num}의 소인수를 모두 고르시오. (정답 2개 이상 가능, 쉼표로 구분)`,
                        options: ["2", "3", "5", "7", "11"],
                        ans: num % 5 === 0 ? "1,2,3" : "1,2",
                        solution: `${num}을 소인수분해하면 알 수 있습니다.`,
                        correctRate: 88.0,
                        difficulty: 2
                    });
                } else if (cleanName.includes('원의 성질') || cleanName.includes('삼각비') || cleanName.includes('기하')) {
                    pool.push({
                        id: newId,
                        q: `[${cleanName} 복습 ${newId}] 반지름이 ${newId}cm인 원의 둘레의 길이를 구하시오. (원주율 $\\pi$는 3으로 계산)`,
                        ans: String(2 * 3 * newId),
                        solution: `원주 공식은 $2 \\pi r$ 입니다. 따라서 $2 \\times 3 \\times ${newId} = ${2 * 3 * newId}$ 입니다.`,
                        correctRate: 89.0,
                        difficulty: 2
                    });
                } else {
                    pool.push({
                        id: newId,
                        q: `[${cleanName} 기본 ${newId}] 일차방정식 $3x - ${cVal} = 0$ 의 해를 구하시오. (숫자만 입력)`,
                        ans: String(cVal / 3),
                        solution: `$3x = ${cVal}$ 에서 양변을 3으로 나누면 $x = ${cVal / 3}$ 입니다.`,
                        correctRate: 92.0,
                        difficulty: 1
                    });
                }
            }
        }

        return pool;
    }
};

if (typeof window !== 'undefined') {
    window.MATH_DB = MATH_DB;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MATH_DB;
}
