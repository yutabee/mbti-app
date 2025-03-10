"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

type Tab = "table" | "functions" | "details";

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
  bgLight: string;
  text: string;
  border: string;
  gradient: string;
}

const MBTITable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>("table");
  const [expandedType, setExpandedType] = useState<MBTIType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof MBTIType;
    direction: "ascending" | "descending";
  }>({ key: "type", direction: "ascending" });

  // MBTI data
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

  // Effect to scroll to top when expanded type changes
  useEffect(() => {
    if (expandedType) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveTab("details");
    }
  }, [expandedType]);

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
          type.description.toLowerCase().includes(term) ||
          type.careers.toLowerCase().includes(term) ||
          type.element.toLowerCase().includes(term)
      );
    }

    return [...filtered].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  const handleSort = (key: keyof MBTIType) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getColorByGroup = (group: string): Colors => {
    switch (group) {
      case "分析家（Analyst）":
        return {
          bg: "bg-violet-600",
          bgLight: "bg-violet-50",
          text: "text-violet-800",
          border: "border-violet-200",
          gradient: "from-violet-600 to-indigo-700",
        };
      case "外交官（Diplomat）":
        return {
          bg: "bg-emerald-600",
          bgLight: "bg-emerald-50",
          text: "text-emerald-800",
          border: "border-emerald-200",
          gradient: "from-emerald-600 to-green-700",
        };
      case "番人（Sentinel）":
        return {
          bg: "bg-sky-600",
          bgLight: "bg-sky-50",
          text: "text-sky-800",
          border: "border-sky-200",
          gradient: "from-sky-600 to-blue-700",
        };
      case "探検家（Explorer）":
        return {
          bg: "bg-amber-600",
          bgLight: "bg-amber-50",
          text: "text-amber-800",
          border: "border-amber-200",
          gradient: "from-amber-600 to-orange-700",
        };
      default:
        return {
          bg: "bg-gray-600",
          bgLight: "bg-gray-50",
          text: "text-gray-800",
          border: "border-gray-200",
          gradient: "from-gray-600 to-gray-700",
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

  const renderElementBadges = (elements: string): React.ReactNode => {
    const parts = elements.split("+");
    return (
      <div className="flex flex-wrap gap-1">
        {parts.map((element, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 rounded-full bg-white/80 shadow-sm backdrop-blur-sm"
            title={getElementName(element)}
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

  const renderGroupBadge = (group: string): React.ReactNode => {
    const colors = getColorByGroup(group);
    const displayGroup = group.split("（")[0];

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bgLight} ${colors.text}`}
      >
        {displayGroup}
      </span>
    );
  };

  const renderDetailView = (): React.ReactNode | null => {
    if (!expandedType) return null;
    const colors = getColorByGroup(expandedType.group);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="mt-6"
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              setActiveTab("table");
              setExpandedType(null);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            テーブルに戻る
          </button>
          <span className="text-sm text-gray-500">
            {expandedType.group} • {expandedType.keirsey}
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className={`bg-gradient-to-r ${colors.gradient} p-8 text-white`}>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                <span className="text-4xl">
                  {getTypeEmoji(expandedType.type)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-3xl font-bold">{expandedType.type}</h3>
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {expandedType.name}
                  </span>
                </div>
                <p className="text-white/90 text-lg">
                  {expandedType.description}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="grid grid-cols-4 gap-3">
                {expandedType.element.split("+").map((elem, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center"
                  >
                    <div className="text-xl mb-1">{getElementIcon(elem)}</div>
                    <div className="font-semibold">{elem}</div>
                    <div className="text-xs text-white/80">
                      {getElementName(elem)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <section>
                  <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gray-100 text-gray-700">
                      🧩
                    </div>
                    認知機能
                  </h4>
                  <div className="space-y-3">
                    {expandedType.functions.split("-").map((func, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-4 rounded-xl flex items-center gap-3 ${
                          i === 0
                            ? "bg-green-50 border border-green-100"
                            : i === 1
                            ? "bg-blue-50 border border-blue-100"
                            : i === 2
                            ? "bg-amber-50 border border-amber-100"
                            : "bg-purple-50 border border-purple-100"
                        }`}
                      >
                        <div
                          className={`text-lg font-bold ${
                            i === 0
                              ? "text-green-600"
                              : i === 1
                              ? "text-blue-600"
                              : i === 2
                              ? "text-amber-600"
                              : "text-purple-600"
                          }`}
                        >
                          {func}
                        </div>
                        <div className="flex-1">
                          <div
                            className={`text-sm font-medium ${
                              i === 0
                                ? "text-green-800"
                                : i === 1
                                ? "text-blue-800"
                                : i === 2
                                ? "text-amber-800"
                                : "text-purple-800"
                            }`}
                          >
                            {i === 0
                              ? "主要機能"
                              : i === 1
                              ? "補助機能"
                              : i === 2
                              ? "第三機能"
                              : "劣等機能"}
                          </div>
                          <div
                            className={`text-xs ${
                              i === 0
                                ? "text-green-600"
                                : i === 1
                                ? "text-blue-600"
                                : i === 2
                                ? "text-amber-600"
                                : "text-purple-600"
                            }`}
                          >
                            {functionsExplanation[func]}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gray-100 text-gray-700">
                      💼
                    </div>
                    キャリア適性
                  </h4>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-blue-50 p-5 rounded-xl border border-blue-100"
                  >
                    <div className="text-sm font-medium text-blue-800 mb-2">
                      向いている職業
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {expandedType.careers.split("、").map((career, i) => (
                        <span
                          key={i}
                          className="bg-white px-3 py-1 rounded-lg text-blue-700 shadow-sm"
                        >
                          {career}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </section>
              </div>

              <div className="space-y-6">
                <section>
                  <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gray-100 text-gray-700">
                      ⚡
                    </div>
                    強みと弱み
                  </h4>
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-green-50 p-5 rounded-xl border border-green-100"
                    >
                      <div className="text-sm font-medium text-green-800 mb-2">
                        強み
                      </div>
                      <p className="text-green-700">{expandedType.strengths}</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-red-50 p-5 rounded-xl border border-red-100"
                    >
                      <div className="text-sm font-medium text-red-800 mb-2">
                        弱み
                      </div>
                      <p className="text-red-700">{expandedType.weaknesses}</p>
                    </motion.div>
                  </div>
                </section>

                <section>
                  <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gray-100 text-gray-700">
                      🔄
                    </div>
                    ストレスと決断
                  </h4>
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-amber-50 p-5 rounded-xl border border-amber-100"
                    >
                      <div className="text-sm font-medium text-amber-800 mb-2">
                        ストレス時の特徴
                      </div>
                      <p className="text-amber-700">{expandedType.stress}</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-indigo-50 p-5 rounded-xl border border-indigo-100"
                    >
                      <div className="text-sm font-medium text-indigo-800 mb-2">
                        意思決定プロセス
                      </div>
                      <p className="text-indigo-700">{expandedType.decision}</p>
                    </motion.div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderFunctionsExplanation = (): React.ReactNode => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="mt-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
    >
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <span className="inline-block w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-700">
          🧠
        </span>
        認知機能の説明
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(functionsExplanation).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border rounded-xl p-4 transition-all hover:shadow-md hover:bg-gray-50"
          >
            <span
              className={`inline-block text-lg font-bold mb-2 px-2 py-1 rounded-lg ${
                key.startsWith("S")
                  ? "bg-blue-100 text-blue-700"
                  : key.startsWith("N")
                  ? "bg-purple-100 text-purple-700"
                  : key.startsWith("T")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {key}
            </span>
            <p className="text-gray-700">{value}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
          <h4 className="text-xl font-semibold text-indigo-800 mb-3">
            MBTIの構成要素
          </h4>
          <div className="space-y-4">
            <div className="flex gap-3 items-center">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <span className="text-2xl">E/I</span>
              </div>
              <div>
                <div className="font-medium text-indigo-900">
                  エネルギーの方向
                </div>
                <div className="text-sm text-indigo-700">
                  外向型(Extraversion)か内向型(Introversion)か
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <span className="text-2xl">S/N</span>
              </div>
              <div>
                <div className="font-medium text-indigo-900">情報収集</div>
                <div className="text-sm text-indigo-700">
                  感覚型(Sensing)か直観型(iNtuition)か
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <span className="text-2xl">T/F</span>
              </div>
              <div>
                <div className="font-medium text-indigo-900">意思決定</div>
                <div className="text-sm text-indigo-700">
                  思考型(Thinking)か感情型(Feeling)か
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <span className="text-2xl">J/P</span>
              </div>
              <div>
                <div className="font-medium text-indigo-900">外界への対応</div>
                <div className="text-sm text-indigo-700">
                  判断型(Judging)か知覚型(Perceiving)か
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200">
          <h4 className="text-xl font-semibold text-gray-800 mb-3">
            認知機能の順序
          </h4>
          <div className="space-y-4">
            <div>
              <div className="font-medium text-gray-900 mb-1">
                主要機能 (Dominant)
              </div>
              <div className="text-sm text-gray-700">
                最も自然で強い機能。その人の中心的な判断や行動の基盤となる。
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-900 mb-1">
                補助機能 (Auxiliary)
              </div>
              <div className="text-sm text-gray-700">
                主要機能をサポートし、バランスを取る機能。
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-900 mb-1">
                第三機能 (Tertiary)
              </div>
              <div className="text-sm text-gray-700">
                比較的未発達で、ストレス下で問題を起こしやすい機能。
              </div>
            </div>
            <div>
              <div className="font-medium text-gray-900 mb-1">
                劣等機能 (Inferior)
              </div>
              <div className="text-sm text-gray-700">
                最も未発達で、大きなストレス下で突然表れることがある機能。
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderSortIndicator = (key: keyof MBTIType) => {
    if (sortConfig.key !== key) return null;

    return (
      <span className="ml-1">
        {sortConfig.direction === "ascending" ? "▲" : "▼"}
      </span>
    );
  };

  const renderTableView = (): React.ReactNode => {
    const filteredTypes = getFilteredTypes();

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="mt-6"
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("type")}
                  >
                    <div className="flex items-center">
                      タイプ
                      {renderSortIndicator("type")}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      名前
                      {renderSortIndicator("name")}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("group")}
                  >
                    <div className="flex items-center">
                      グループ
                      {renderSortIndicator("group")}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    要素
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("functions")}
                  >
                    <div className="flex items-center">
                      認知機能
                      {renderSortIndicator("functions")}
                    </div>
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("description")}
                  >
                    <div className="flex items-center">
                      特徴
                      {renderSortIndicator("description")}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    詳細
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTypes.map((type) => {
                  const colors = getColorByGroup(type.group);
                  return (
                    <tr
                      key={type.type}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-xl mr-2">
                            {getTypeEmoji(type.type)}
                          </span>
                          <span className="font-medium">{type.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium">{type.name}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderGroupBadge(type.group)}
                      </td>
                      <td className="px-6 py-4">
                        {renderElementBadges(type.element)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                        <div className="text-sm text-gray-700">
                          {type.functions}
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <div className="text-sm text-gray-700 truncate max-w-xs">
                          {type.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => setExpandedType(type)}
                          className="text-blue-600 hover:text-blue-900 font-medium"
                        >
                          詳細を見る
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filteredTypes.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center">
                      <div className="text-4xl mb-3">🔍</div>
                      <p className="text-gray-500">
                        該当するタイプが見つかりません
                      </p>
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedGroup("all");
                        }}
                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        検索条件をリセット
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderCompactTableView = (): React.ReactNode => {
    const filteredTypes = getFilteredTypes();

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="mt-6 lg:hidden"
      >
        <div className="space-y-4">
          {filteredTypes.map((type) => {
            const colors = getColorByGroup(type.group);
            return (
              <div
                key={type.type}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className={`h-1 ${colors.bg}`}></div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">
                        {getTypeEmoji(type.type)}
                      </span>
                      <div>
                        <div className="font-bold">{type.type}</div>
                        <div className="text-sm text-gray-600">{type.name}</div>
                      </div>
                    </div>
                    {renderGroupBadge(type.group)}
                  </div>

                  <div className="mb-3 text-sm text-gray-700">
                    {type.description}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-1">
                      {type.element.split("+").map((elem, i) => (
                        <span
                          key={i}
                          className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-700"
                          title={getElementName(elem)}
                        >
                          {getElementIcon(elem)} {elem}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setExpandedType(type)}
                      className="text-sm text-blue-600 font-medium hover:text-blue-800"
                    >
                      詳細
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredTypes.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-gray-500">該当するタイプが見つかりません</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedGroup("all");
                }}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                検索条件をリセット
              </button>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const renderGroupFilter = (): React.ReactNode => {
    return (
      <div className="flex flex-wrap gap-2 mb-6">
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => setSelectedGroup(group.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedGroup === group.id
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {group.name}
          </button>
        ))}
      </div>
    );
  };

  const renderHeader = (): React.ReactNode => {
    const currentTab =
      activeTab === "details" && expandedType
        ? "詳細"
        : activeTab === "functions"
        ? "認知機能"
        : "タイプ一覧";

    return (
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white sticky top-0 z-10 px-6 py-4 rounded-xl shadow-lg mb-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-700 text-xl">
              🧠
            </div>
            <h2 className="text-2xl font-bold">MBTI タイプ一覧</h2>
            <div className="hidden md:block">
              <span className="text-sm bg-gray-100 px-2.5 py-1 rounded-full text-gray-700">
                {currentTab}
              </span>
            </div>
          </div>

          {activeTab !== "details" && (
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 min-w-0 sm:min-w-[240px]">
                <input
                  type="text"
                  placeholder="タイプ名や特徴で検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border rounded-lg pl-10 pr-10 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveTab("table");
                    if (expandedType) setExpandedType(null);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                    activeTab === "table"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                  表形式
                </button>
                <button
                  onClick={() => {
                    setActiveTab("functions");
                    if (expandedType) setExpandedType(null);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                    activeTab === "functions"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  認知機能
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "details":
        return renderDetailView();
      case "functions":
        return renderFunctionsExplanation();
      default:
        return (
          <>
            {renderGroupFilter()}
            <div className="hidden lg:block">{renderTableView()}</div>
            <div className="lg:hidden">{renderCompactTableView()}</div>
          </>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {renderHeader()}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MBTITable;
