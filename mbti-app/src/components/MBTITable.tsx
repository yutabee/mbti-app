"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
// Material Icons
import {
  ArrowBack,
  AutoGraph,
  BubbleChart,
  Celebration,
  Clear,
  Construction,
  Diversity3,
  EmojiEvents,
  FormatListBulleted,
  FunctionsOutlined,
  Handshake,
  InfoOutlined,
  InsertChart,
  Palette,
  Psychology,
  Rocket,
  Science,
  Search,
  Stars,
  TrendingUp,
  ViewModule,
  WorkspacePremium,
} from "@mui/icons-material";

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

  const getColorByGroup = (group: string) => {
    switch (group) {
      case "分析家（Analyst）":
        return {
          primary: "#6366f1",
          secondary: "#818cf8",
          bg: "bg-indigo-600",
          bgLight: "bg-indigo-50",
          text: "text-indigo-600",
          border: "border-indigo-200",
          gradient: "from-indigo-600 to-indigo-800",
        };
      case "外交官（Diplomat）":
        return {
          primary: "#10b981",
          secondary: "#34d399",
          bg: "bg-emerald-600",
          bgLight: "bg-emerald-50",
          text: "text-emerald-600",
          border: "border-emerald-200",
          gradient: "from-emerald-600 to-emerald-800",
        };
      case "番人（Sentinel）":
        return {
          primary: "#0ea5e9",
          secondary: "#38bdf8",
          bg: "bg-sky-600",
          bgLight: "bg-sky-50",
          text: "text-sky-600",
          border: "border-sky-200",
          gradient: "from-sky-600 to-sky-800",
        };
      case "探検家（Explorer）":
        return {
          primary: "#f59e0b",
          secondary: "#fbbf24",
          bg: "bg-amber-600",
          bgLight: "bg-amber-50",
          text: "text-amber-600",
          border: "border-amber-200",
          gradient: "from-amber-600 to-amber-800",
        };
      default:
        return {
          primary: "#4b5563",
          secondary: "#9ca3af",
          bg: "bg-gray-600",
          bgLight: "bg-gray-50",
          text: "text-gray-600",
          border: "border-gray-200",
          gradient: "from-gray-600 to-gray-800",
        };
    }
  };

  // Material Icon components for each MBTI type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ISTJ":
        return <InsertChart fontSize="inherit" />;
      case "ISFJ":
        return <Diversity3 fontSize="inherit" />;
      case "INFJ":
        return <Psychology fontSize="inherit" />;
      case "INTJ":
        return <AutoGraph fontSize="inherit" />;
      case "ISTP":
        return <Construction fontSize="inherit" />;
      case "ISFP":
        return <Palette fontSize="inherit" />;
      case "INFP":
        return <Stars fontSize="inherit" />;
      case "INTP":
        return <Science fontSize="inherit" />;
      case "ESTP":
        return <Rocket fontSize="inherit" />;
      case "ESFP":
        return <Celebration fontSize="inherit" />;
      case "ENFP":
        return <BubbleChart fontSize="inherit" />;
      case "ENTP":
        return <Stars fontSize="inherit" />;
      case "ESTJ":
        return <TrendingUp fontSize="inherit" />;
      case "ESFJ":
        return <Handshake fontSize="inherit" />;
      case "ENFJ":
        return <EmojiEvents fontSize="inherit" />;
      case "ENTJ":
        return <WorkspacePremium fontSize="inherit" />;
      default:
        return <Psychology fontSize="inherit" />;
    }
  };

  const elementMeaning = {
    E: "外向的 (Extraversion)",
    I: "内向的 (Introversion)",
    S: "感覚的 (Sensing)",
    N: "直観的 (Intuition)",
    T: "思考的 (Thinking)",
    F: "感情的 (Feeling)",
    J: "判断的 (Judging)",
    P: "知覚的 (Perceiving)",
  };

  // CARD VIEW COMPONENT
  const TypeCard = ({ type }: { type: MBTIType }) => {
    const colors = getColorByGroup(type.group);
    const groupName = type.group.split("（")[0];

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
        onClick={() => setExpandedType(type)}
      >
        <div className={`h-1 ${colors.bg}`}></div>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`w-10 h-10 rounded-lg ${colors.bgLight} ${colors.text} flex items-center justify-center text-2xl`}
            >
              {getTypeIcon(type.type)}
            </div>
            <div>
              <div className="font-bold text-gray-900">{type.type}</div>
              <div className="text-sm text-gray-500">{type.name}</div>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {type.description}
          </p>

          <div className="flex items-center justify-between">
            <span
              className={`text-xs px-2 py-1 rounded-full ${colors.bgLight} ${colors.text} font-medium`}
            >
              {groupName}
            </span>
            <span className="text-xs text-gray-400">{type.functions}</span>
          </div>
        </div>
      </motion.div>
    );
  };

  // DETAIL VIEW
  const DetailView = () => {
    if (!expandedType) return null;
    const colors = getColorByGroup(expandedType.group);
    const elements = expandedType.element.split("+");

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => {
              setActiveTab("table");
              setExpandedType(null);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors text-sm"
          >
            <ArrowBack fontSize="small" />
            戻る
          </button>
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div
            className={`bg-gradient-to-r ${colors.gradient} px-6 py-8 text-white`}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="bg-white/10 backdrop-blur-sm h-20 w-20 rounded-2xl flex items-center justify-center text-4xl">
                {getTypeIcon(expandedType.type)}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold">{expandedType.type}</h2>
                  <span className="text-sm px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                    {expandedType.name}
                  </span>
                </div>
                <p className="text-white/90">{expandedType.description}</p>
                <div className="mt-4 flex gap-2">
                  {elements.map((elem, i) => (
                    <span
                      key={i}
                      className="bg-white/10 backdrop-blur-sm px-2 py-1 rounded text-sm"
                      title={
                        elementMeaning[elem as keyof typeof elementMeaning]
                      }
                    >
                      {elem}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
                    <FunctionsOutlined
                      fontSize="small"
                      className={colors.text}
                    />
                    認知機能
                  </h3>
                  {expandedType.functions.split("-").map((func, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 mb-2 p-3 bg-gray-50 rounded-lg"
                    >
                      <div
                        className={`text-${
                          i === 0
                            ? colors.text
                            : i === 1
                            ? "blue-600"
                            : i === 2
                            ? "amber-600"
                            : "purple-600"
                        } font-medium`}
                      >
                        {func}
                      </div>
                      <div className="text-sm text-gray-600">
                        {functionsExplanation[func]}
                      </div>
                    </div>
                  ))}
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
                    <WorkspacePremium
                      fontSize="small"
                      className={colors.text}
                    />
                    キャリア適性
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex flex-wrap gap-2">
                      {expandedType.careers.split("、").map((career, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white rounded text-sm text-gray-700 shadow-sm"
                        >
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
                    <TrendingUp fontSize="small" className={colors.text} />
                    強みと弱み
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-700 mb-1">
                        強み
                      </div>
                      <p className="text-sm text-gray-700">
                        {expandedType.strengths}
                      </p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <div className="font-medium text-red-700 mb-1">弱み</div>
                      <p className="text-sm text-gray-700">
                        {expandedType.weaknesses}
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
                    <Psychology fontSize="small" className={colors.text} />
                    ストレスと決断
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <div className="font-medium text-amber-700 mb-1">
                        ストレス時の特徴
                      </div>
                      <p className="text-sm text-gray-700">
                        {expandedType.stress}
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-700 mb-1">
                        意思決定プロセス
                      </div>
                      <p className="text-sm text-gray-700">
                        {expandedType.decision}
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // FUNCTIONS EXPLANATION
  const FunctionsView = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-8"
      >
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
            <FunctionsOutlined fontSize="small" className="text-blue-600" />
            認知機能
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(functionsExplanation).map(([key, value]) => (
              <div
                key={key}
                className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-all"
              >
                <div
                  className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-sm font-medium mb-2 ${
                    key.startsWith("S")
                      ? "bg-blue-50 text-blue-700"
                      : key.startsWith("N")
                      ? "bg-purple-50 text-purple-700"
                      : key.startsWith("T")
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  <FunctionsOutlined fontSize="small" />
                  {key}
                </div>
                <p className="text-sm text-gray-600">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FormatListBulleted
                  fontSize="small"
                  className="text-blue-600"
                />
                MBTIの構成要素
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm font-medium text-gray-700">
                    E/I
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      エネルギーの方向
                    </div>
                    <div className="text-xs text-gray-500">
                      外向型(Extraversion)か内向型(Introversion)か
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm font-medium text-gray-700">
                    S/N
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      情報収集
                    </div>
                    <div className="text-xs text-gray-500">
                      感覚型(Sensing)か直観型(iNtuition)か
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm font-medium text-gray-700">
                    T/F
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      意思決定
                    </div>
                    <div className="text-xs text-gray-500">
                      思考型(Thinking)か感情型(Feeling)か
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm font-medium text-gray-700">
                    J/P
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">
                      外界への対応
                    </div>
                    <div className="text-xs text-gray-500">
                      判断型(Judging)か知覚型(Perceiving)か
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <InfoOutlined fontSize="small" className="text-blue-600" />
                認知機能の順序
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    主要機能 (Dominant)
                  </div>
                  <div className="text-xs text-gray-500">
                    最も自然で強い機能。その人の中心的な判断や行動の基盤となる。
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    補助機能 (Auxiliary)
                  </div>
                  <div className="text-xs text-gray-500">
                    主要機能をサポートし、バランスを取る機能。
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    第三機能 (Tertiary)
                  </div>
                  <div className="text-xs text-gray-500">
                    比較的未発達で、ストレス下で問題を起こしやすい機能。
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    劣等機能 (Inferior)
                  </div>
                  <div className="text-xs text-gray-500">
                    最も未発達で、大きなストレス下で突然表れることがある機能。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // GRID VIEW
  const GridView = () => {
    const filteredTypes = getFilteredTypes();

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTypes.map((type) => (
          <TypeCard key={type.type} type={type} />
        ))}
        {filteredTypes.length === 0 && (
          <div className="col-span-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="text-4xl mb-4">
              <Search fontSize="inherit" className="text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">該当するタイプが見つかりません</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedGroup("all");
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm flex items-center gap-2 mx-auto"
            >
              <Clear fontSize="small" />
              検索条件をリセット
            </button>
          </div>
        )}
      </div>
    );
  };

  // MAIN LAYOUT
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* HEADER */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 sticky top-0 z-10 border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <Psychology fontSize="small" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">MBTI タイプ</h1>
          </div>

          {activeTab !== "details" && (
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-200 rounded-lg pl-10 pr-10 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <Search fontSize="small" />
                </div>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <Clear fontSize="small" />
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setActiveTab("table");
                    if (expandedType) setExpandedType(null);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    activeTab === "table"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <ViewModule fontSize="small" />
                  一覧
                </button>
                <button
                  onClick={() => {
                    setActiveTab("functions");
                    if (expandedType) setExpandedType(null);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    activeTab === "functions"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <FunctionsOutlined fontSize="small" />
                  認知機能
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FILTER BAR */}
      {activeTab === "table" && !expandedType && (
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex flex-wrap gap-2">
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => setSelectedGroup(group.id)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  selectedGroup === group.id
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {group.name}
              </button>
            ))}
          </div>

          <div className="ml-auto">
            <select
              onChange={(e) => handleSort(e.target.value as keyof MBTIType)}
              value={sortConfig.key}
              className="px-3 py-1.5 rounded-lg text-sm border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="type">タイプ順</option>
              <option value="name">名前順</option>
              <option value="group">グループ順</option>
              <option value="functions">認知機能順</option>
            </select>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + (expandedType?.type || "")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "details" && expandedType ? (
            <DetailView />
          ) : activeTab === "functions" ? (
            <FunctionsView />
          ) : (
            <GridView />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MBTITable;
