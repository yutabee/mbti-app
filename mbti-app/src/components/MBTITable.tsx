import React from 'react';

interface MBTITableProps {
  // 必要に応じてプロパティを追加
}

const MBTITable: React.FC<MBTITableProps> = () => {
  const mbtiTypes = [
    ['ISTJ', 'ISFJ', 'INFJ', 'INTJ'],
    ['ISTP', 'ISFP', 'INFP', 'INTP'],
    ['ESTP', 'ESFP', 'ENFP', 'ENTP'],
    ['ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'],
  ];

  return (
    <div className="mbti-table">
      <table>
        <tbody>
          {mbtiTypes.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((type) => (
                <td key={type}>{type}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MBTITable;