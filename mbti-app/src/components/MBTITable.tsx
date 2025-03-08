import React, { useState } from "react";

type Tab = "basic" | "functions";

interface MBTIType {
  type: string;
  name: string;
  group: string;
  keirsey: string;
  functions: string;
  shadow: string;
  stress: string;
  decision: string;
  strengths: string;
  weaknesses: string;
  careers: string;
  description: string;
  element: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
}

interface Colors {
  bg: string;
  border: string;
  text: string;
  hover: string;
  gradient: string;
}

const MBTITable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("basic");
  const [expandedType, setExpandedType] = useState<MBTIType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("all");

  const mbtiTypes: MBTIType[] = [
    {
      type: "ISTJ",
      name: "管理者",
      group: "番人（Sentinel）",
      keirsey: "管理者（SJ）",
      functions: "Si-Te-Fi-Ne",
      shadow: "Ne-Fi-Te-Si",
      stress: "破滅的な可能性を考え、衝動的になる",
      decision:
        "過去の経験と論理に基づき、秩序立てて意思決定。感情よりも事実を重視",
      strengths: "信頼性、正確さ、秩序立った思考",
      weaknesses: "変化への適応が遅い",
      careers: "会計士、管理職、軍人",
      description: "責任感が強く、実践的で組織的",
      element: "I+S+T+J",
    },
    {
      type: "ISFJ",
      name: "擁護者",
      group: "番人（Sentinel）",
      keirsey: "管理者（SJ）",
      functions: "Si-Fe-Ti-Ne",
      shadow: "Ne-Ti-Fe-Si",
      stress: "悲観的になり、ネガティブな可能性に囚われる",
      decision:
        "過去の経験と他者への影響を考慮。調和を大切にしながら現実的に判断",
      strengths: "忠誠心、細部への注意、実用性",
      weaknesses: "自己主張が弱い",
      careers: "看護師、教師、カウンセラー",
      description: "思いやりがあり、細部に注意を払う",
      element: "I+S+F+J",
    },
    {
      type: "INFJ",
      name: "予言者",
      group: "外交官（Diplomat）",
      keirsey: "理想主義者（NF）",
      functions: "Ni-Fe-Ti-Se",
      shadow: "Se-Ti-Fe-Ni",
      stress: "衝動的に行動し、過度に批判的になる",
      decision: "直観的洞察と人間関係への配慮。長期的な意味と価値を重視",
      strengths: "洞察力、創造性、決断力",
      weaknesses: "完璧主義",
      careers: "心理カウンセラー、作家、教師",
      description: "洞察力があり、理想主義的",
      element: "I+N+F+J",
    },
    {
      type: "INTJ",
      name: "建築家",
      group: "分析家（Analyst）",
      keirsey: "合理主義者（NT）",
      functions: "Ni-Te-Fi-Se",
      shadow: "Se-Fi-Te-Ni",
      stress: "衝動的な行動に走り、感情的になる",
      decision: "長期的な視点と論理的分析。効率と戦略を重視した計画的な決定",
      strengths: "戦略的思考、独創性、自己確信",
      weaknesses: "感情表現が苦手",
      careers: "科学者、戦略家、システム設計者",
      description: "戦略的思考、独立心が強い",
      element: "I+N+T+J",
    },
    {
      type: "ISTP",
      name: "巧芸家",
      group: "探検家（Explorer）",
      keirsey: "職人（SP）",
      functions: "Ti-Se-Ni-Fe",
      shadow: "Fe-Ni-Se-Ti",
      stress: "過度に感情的になり、他者の感情に過敏になる",
      decision:
        "論理的分析と現状把握。問題解決に焦点を当て、実用的な結果を重視",
      strengths: "技術的能力、冷静さ、適応力",
      weaknesses: "長期的計画が苦手",
      careers: "エンジニア、パイロット、職人",
      description: "分析的で実践的、冒険を好む",
      element: "I+S+T+P",
    },
    {
      type: "ISFP",
      name: "芸術家",
      group: "探検家（Explorer）",
      keirsey: "職人（SP）",
      functions: "Fi-Se-Ni-Te",
      shadow: "Te-Ni-Se-Fi",
      stress: "独断的、批判的になり、他者をコントロールしようとする",
      decision: "個人的価値観と現在の状況に基づく。感情と調和を重視した決定",
      strengths: "審美眼、創造性、優しさ",
      weaknesses: "批判に敏感",
      careers: "アーティスト、デザイナー、看護師",
      description: "芸術的、調和を好む",
      element: "I+S+F+P",
    },
    {
      type: "INFP",
      name: "仲介者",
      group: "外交官（Diplomat）",
      keirsey: "理想主義者（NF）",
      functions: "Fi-Ne-Si-Te",
      shadow: "Te-Si-Ne-Fi",
      stress: "批判的、強制的になり、細部にこだわる",
      decision: "強い内的価値観と可能性の探求。理想と個人的信念に基づいて判断",
      strengths: "共感力、理想主義、創造性",
      weaknesses: "現実的判断が苦手",
      careers: "カウンセラー、作家、アーティスト",
      description: "理想主義的、創造的",
      element: "I+N+F+P",
    },
    {
      type: "INTP",
      name: "論理学者",
      group: "分析家（Analyst）",
      keirsey: "合理主義者（NT）",
      functions: "Ti-Ne-Si-Fe",
      shadow: "Fe-Si-Ne-Ti",
      stress: "感情的になり、他者の評価を過度に気にする",
      decision: "論理的一貫性と可能性の分析。概念的な理解と客観的分析を重視",
      strengths: "分析力、独創性、論理的思考",
      weaknesses: "社交性に欠ける",
      careers: "プログラマー、科学者、哲学者",
      description: "論理的、理論的、革新的",
      element: "I+N+T+P",
    },
    {
      type: "ESTP",
      name: "起業家",
      group: "探検家（Explorer）",
      keirsey: "職人（SP）",
      functions: "Se-Ti-Fe-Ni",
      shadow: "Ni-Fe-Ti-Se",
      stress: "陰謀論的になり、将来に対して悲観的になる",
      decision: "現実的状況と論理的分析。即時的な問題解決と実際的な結果を重視",
      strengths: "行動力、問題解決能力、適応力",
      weaknesses: "忍耐力がない",
      careers: "起業家、セールス、スポーツ選手",
      description: "活動的、現実的、自発的",
      element: "E+S+T+P",
    },
    {
      type: "ESFP",
      name: "エンターテイナー",
      group: "探検家（Explorer）",
      keirsey: "職人（SP）",
      functions: "Se-Fi-Te-Ni",
      shadow: "Ni-Te-Fi-Se",
      stress: "パラノイア的になり、不吉な予感に囚われる",
      decision: "現状と個人的価値観。人間関係と楽しさを重視した即興的な決定",
      strengths: "社交性、楽観性、実用的な創造性",
      weaknesses: "長期計画が苦手",
      careers: "俳優、販売員、イベントプランナー",
      description: "社交的、楽観的、即興的",
      element: "E+S+F+P",
    },
    {
      type: "ENFP",
      name: "広告塔",
      group: "外交官（Diplomat）",
      keirsey: "理想主義者（NF）",
      functions: "Ne-Fi-Te-Si",
      shadow: "Si-Te-Fi-Ne",
      stress: "細部にこだわり、過去の失敗を繰り返し考える",
      decision: "新しい可能性と個人的価値観。創造性と人間の可能性を重視",
      strengths: "情熱、コミュニケーション力、創造性",
      weaknesses: "集中力が続かない",
      careers: "ジャーナリスト、コンサルタント、起業家",
      description: "熱心、創造的、可能性を探る",
      element: "E+N+F+P",
    },
    {
      type: "ENTP",
      name: "発明家",
      group: "分析家（Analyst）",
      keirsey: "合理主義者（NT）",
      functions: "Ne-Ti-Fe-Si",
      shadow: "Si-Fe-Ti-Ne",
      stress: "過去にこだわり、細部に神経質になる",
      decision: "新たな可能性と論理的分析。革新的アイデアと概念的整合性を重視",
      strengths: "革新性、機転の良さ、分析力",
      weaknesses: "詳細への注意力不足",
      careers: "起業家、弁護士、発明家",
      description: "革新的、資源豊富、論争を好む",
      element: "E+N+T+P",
    },
    {
      type: "ESTJ",
      name: "幹部",
      group: "番人（Sentinel）",
      keirsey: "管理者（SJ）",
      functions: "Te-Si-Ne-Fi",
      shadow: "Fi-Ne-Si-Te",
      stress: "感情的になり、個人的な価値観に固執する",
      decision:
        "論理的効率性と確立された方法。秩序と結果を重視した体系的な決定",
      strengths: "組織力、実用性、計画性",
      weaknesses: "柔軟性に欠ける",
      careers: "企業経営者、管理職、法律家",
      description: "組織的、実務的、結果志向",
      element: "E+S+T+J",
    },
    {
      type: "ESFJ",
      name: "領事官",
      group: "番人（Sentinel）",
      keirsey: "管理者（SJ）",
      functions: "Fe-Si-Ne-Ti",
      shadow: "Ti-Ne-Si-Fe",
      stress: "論理に過度にこだわり、批判的になる",
      decision: "社会的調和と確立された方法。人間関係と社会的期待を重視",
      strengths: "協調性、実用的な支援、忠誠心",
      weaknesses: "批判に弱い",
      careers: "教師、看護師、カスタマーサービス",
      description: "協力的、思いやりがある、社交的",
      element: "E+S+F+J",
    },
    {
      type: "ENFJ",
      name: "主人公",
      group: "外交官（Diplomat）",
      keirsey: "理想主義者（NF）",
      functions: "Fe-Ni-Se-Ti",
      shadow: "Ti-Se-Ni-Fe",
      stress: "批判的、分析的になりすぎ、孤立する",
      decision: "社会的調和と直観的洞察。人々の成長と全体的な調和を重視",
      strengths: "カリスマ性、共感力、協調性",
      weaknesses: "批判に敏感",
      careers: "教師、カウンセラー、人事マネージャー",
      description: "カリスマ的、思いやりがある、人を鼓舞する",
      element: "E+N+F+J",
    },
    {
      type: "ENTJ",
      name: "指揮官",
      group: "分析家（Analyst）",
      keirsey: "合理主義者（NT）",
      functions: "Te-Ni-Se-Fi",
      shadow: "Fi-Se-Ni-Te",
      stress: "個人的な感情に囚われ、衝動的になる",
      decision: "論理的効率性と長期的ビジョン。戦略と目標達成を重視した決断",
      strengths: "リーダーシップ、効率性、戦略的思考",
      weaknesses: "感情面への配慮不足",
      careers: "企業幹部、弁護士、コンサルタント",
      description: "決断力がある、リーダー的、戦略的",
      element: "E+N+T+J",
    },
  ];

  const functionsExplanation: Record<string, string> = {
    Si: "内向感覚 - 詳細、過去の経験、習慣を重視",
    Se: "外向感覚 - 現在の体験、五感の情報を重視",
    Ni: "内向直観 - パターン認識、未来予測、洞察",
    Ne: "外向直観 - 可能性、関連性、アイデア創出",
    Ti: "内向思考 - 論理的分析、体系化、原理原則",
    Te: "外向思考 - 効率性、構造化、目標達成",
    Fi: "内向感情 - 個人的価値観、真正性、調和",
    Fe: "外向感情 - 対人関係、社会的調和、共感",
  };

  const groups: Group[] = [
    { id: "all", name: "すべて", description: "" },
    {
      id: "分析家（Analyst）",
      name: "分析家",
      description: "知識と可能性を探求する論理的・戦略的なタイプ（NT）",
    },
    {
      id: "外交官（Diplomat）",
      name: "外交官",
      description: "人間関係と協調性を重視する理想主義的なタイプ（NF）",
    },
    {
      id: "番人（Sentinel）",
      name: "番人",
      description: "秩序と安定を重視する実務的・責任感のあるタイプ（SJ）",
    },
    {
      id: "探検家（Explorer）",
      name: "探検家",
      description: "自由と行動を好む冒険的・柔軟なタイプ（SP）",
    },
  ];

  const getFilteredTypes = (): MBTIType[] => {
    let filtered = mbtiTypes;

    if (selectedGroup !== "all") {
      filtered = filtered.filter((type) => type.group === selectedGroup);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (type) =>
          type.type.toLowerCase().includes(term) ||
          type.name.toLowerCase().includes(term) ||
          type.description.toLowerCase().includes(term)
      );
    }

    return filtered;
  };

  const getColorByGroup = (group: string): Colors => {
    switch (group) {
      case "分析家（Analyst）":
        return {
          bg: "bg-violet-50",
          border: "border-violet-200",
          text: "text-violet-800",
          hover: "hover:bg-violet-100",
          gradient: "from-violet-500 to-indigo-600",
        };
      case "外交官（Diplomat）":
        return {
          bg: "bg-emerald-50",
          border: "border-emerald-200",
          text: "text-emerald-800",
          hover: "hover:bg-emerald-100",
          gradient: "from-emerald-500 to-green-600",
        };
      case "番人（Sentinel）":
        return {
          bg: "bg-sky-50",
          border: "border-sky-200",
          text: "text-sky-800",
          hover: "hover:bg-sky-100",
          gradient: "from-sky-500 to-blue-600",
        };
      case "探検家（Explorer）":
        return {
          bg: "bg-amber-50",
          border: "border-amber-200",
          text: "text-amber-800",
          hover: "hover:bg-amber-100",
          gradient: "from-amber-500 to-orange-600",
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          text: "text-gray-800",
          hover: "hover:bg-gray-100",
          gradient: "from-gray-500 to-gray-600",
        };
    }
  };

  const getElementIcon = (element: string): string => {
    switch (element) {
      case "E":
        return "👥";
      case "I":
        return "🧠";
      case "S":
        return "📊";
      case "N":
        return "💫";
      case "T":
        return "🔍";
      case "F":
        return "💖";
      case "J":
        return "📝";
      case "P":
        return "🔄";
      default:
        return "";
    }
  };

  const renderElementBadges = (elements: string): JSX.Element => {
    const parts = elements.split("+");
    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {parts.map((element, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 rounded-full bg-white shadow-sm"
          >
            {getElementIcon(element)} {element}
          </span>
        ))}
      </div>
    );
  };

  const getTypeEmoji = (type: string): string => {
    const emojis: Record<string, string> = {
      ISTJ: "📊",
      ISFJ: "🤲",
      INFJ: "🔮",
      INTJ: "🏗️",
      ISTP: "🛠️",
      ISFP: "🎨",
      INFP: "🕊️",
      INTP: "🧪",
      ESTP: "🚀",
      ESFP: "🎭",
      ENFP: "✨",
      ENTP: "💡",
      ESTJ: "📈",
      ESFJ: "🤝",
      ENFJ: "🌟",
      ENTJ: "👑",
    };
    return emojis[type] || "🧠";
  };

  const getElementName = (elem: string): string => {
    const names: Record<string, string> = {
      E: "外向的",
      I: "内向的",
      S: "感覚的",
      N: "直観的",
      T: "思考的",
      F: "感情的",
      J: "判断的",
      P: "知覚的",
    };
    return names[elem] || "";
  };

  const renderDetailView = (type: MBTIType | null): JSX.Element | null => {
    if (!type) return null;
    const colors = getColorByGroup(type.group);

    return (
      <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className={`bg-gradient-to-r ${colors.gradient} p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">
                {type.type} - {type.name}
              </h3>
              <p className="text-white/80 mt-1">{type.description}</p>
            </div>
            <div className="hidden md:block">
              <span className="text-3xl">{getTypeEmoji(type.type)}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
              {type.group}
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
              {type.keirsey}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <section>
                <h4 className="text-lg font-semibold mb-3 flex items-center">
                  <span className="inline-block w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                    🧩
                  </span>
                  基本要素
                </h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {type.element.split("+").map((elem, i) => (
                    <div
                      key={i}
                      className="flex items-center bg-gray-50 rounded-lg p-2 border border-gray-100"
                    >
                      <span className="text-xl mr-2">
                        {getElementIcon(elem)}
                      </span>
                      <div>
                        <div className="font-medium">{elem}</div>
                        <div className="text-xs text-gray-500">
                          {getElementName(elem)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    認知機能
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {type.functions.split("-").map((func, i) => (
                      <div
                        key={i}
                        className={`px-2 py-1 rounded text-xs ${
                          i === 0
                            ? "bg-green-100 text-green-800"
                            : i === 1
                            ? "bg-blue-100 text-blue-800"
                            : i === 2
                            ? "bg-amber-100 text-amber-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                        title={functionsExplanation[func]}
                      >
                        {func} {i === 0 ? "(主要)" : i === 1 ? "(補助)" : ""}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section>
                <h4 className="text-lg font-semibold mb-3 flex items-center">
                  <span className="inline-block w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                    ⚡
                  </span>
                  強みと弱み
                </h4>
                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                    <div className="text-sm font-medium text-green-800 mb-1">
                      強み
                    </div>
                    <p>{type.strengths}</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                    <div className="text-sm font-medium text-red-800 mb-1">
                      弱み
                    </div>
                    <p>{type.weaknesses}</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <section>
                <h4 className="text-lg font-semibold mb-3 flex items-center">
                  <span className="inline-block w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                    🔄
                  </span>
                  ストレスと決断
                </h4>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <div className="text-sm font-medium text-gray-700 mb-1">
                      意思決定プロセス
                    </div>
                    <p>{type.decision}</p>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                    <div className="text-sm font-medium text-amber-800 mb-1">
                      ストレス時の特徴
                    </div>
                    <p>{type.stress}</p>
                  </div>
                </div>
              </section>

              <section>
                <h4 className="text-lg font-semibold mb-3 flex items-center">
                  <span className="inline-block w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                    💼
                  </span>
                  キャリアと応用
                </h4>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <div className="text-sm font-medium text-blue-800 mb-1">
                      向いている職業
                    </div>
                    <p>{type.careers}</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                    <div className="text-sm font-medium text-purple-800 mb-1">
                      シャドウ機能
                    </div>
                    <p>{type.shadow}</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTypeCard = (type: MBTIType): JSX.Element => {
    const colors = getColorByGroup(type.group);
    const emoji = getTypeEmoji(type.type);

    return (
      <div
        key={type.type}
        className={`border rounded-xl p-4 cursor-pointer transition-all duration-200 ${
          colors.bg
        } ${colors.border} ${colors.hover} ${
          expandedType?.type === type.type
            ? "ring-2 ring-offset-2 ring-blue-500 shadow-md"
            : "shadow-sm hover:shadow"
        }`}
        onClick={() =>
          setExpandedType(expandedType?.type === type.type ? null : type)
        }
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold flex items-center">
              {type.type}
              <span
                className={`ml-2 text-sm py-1 px-2 rounded-full bg-white ${colors.text}`}
              >
                {type.name}
              </span>
            </h3>
            <p className="text-sm mt-1 text-gray-600">{type.description}</p>
          </div>
          <span className="text-2xl">{emoji}</span>
        </div>
        <div className="mt-3">
          <span
            className={`inline-block text-xs px-2 py-1 rounded-full bg-white/70 ${colors.text}`}
          >
            {type.group}
          </span>
        </div>
        {renderElementBadges(type.element)}
      </div>
    );
  };

  const renderFunctionsExplanation = (): JSX.Element => (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <span className="inline-block w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
          🧠
        </span>
        認知機能の説明
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(functionsExplanation).map(([key, value]) => (
          <div
            key={key}
            className="border rounded-lg p-3 transition-all hover:bg-gray-50"
          >
            <span className="font-bold text-blue-600">{key}</span>
            <p className="text-sm mt-1 text-gray-600">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBasicView = (): JSX.Element => {
    const filteredTypes = getFilteredTypes();

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTypes.length > 0 ? (
          filteredTypes.map(renderTypeCard)
        ) : (
          <div className="col-span-full p-8 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-700">
              タイプが見つかりません
            </h3>
            <p className="text-gray-500 mt-2">検索条件を変更してみてください</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">MBTI タイプ一覧</h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("basic")}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === "basic"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          基本
        </button>
        <button
          onClick={() => setActiveTab("functions")}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === "functions"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          認知機能
        </button>
      </div>

      {activeTab === "basic" ? renderBasicView() : renderFunctionsExplanation()}

      {renderDetailView(expandedType)}
    </div>
  );
};

export default MBTITable;
