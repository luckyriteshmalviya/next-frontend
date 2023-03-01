import React from "react";
import MathJax from "react-mathjax2";

const QuestionContainer = ({ question }) => {
  const tableHeaders = question?.columns?.map((item) => item.heading);
  const columnData = question?.columns?.map((item) => item.data);

  const transpose = (a) => {
    if (a.length === 0) return [];
    return Object.keys(a[0]).map(function (c) {
      return a.map(function (r) {
        return r[c];
      });
    });
  };

  const rowData = transpose(columnData ?? []);

  return (
    <div className={`question-wrapper`} >
      <div
        className="question"
        dangerouslySetInnerHTML={{
          __html: question?.question?.replaceAll("\\n", ""),
        }}
      ></div>
      {question?.questionType === "math" && (
        <MathJax.Context input="ascii">
          <div className="question-equation">
            <MathJax.Node>{question?.questionEquation}</MathJax.Node>
          </div>
        </MathJax.Context>
      )}
      {question?.questionImage?.length > 0 && (
        <div className="question-img">
          <img src={question?.questionImage[0]?.img} />
        </div>
      )}
      {question?.questionType === "match" && (
        <div className="match-the-following">
          {question?.columns.map((column) => (
            <div className="row">
              <div className="element">{column?.heading}</div>
              {(column?.data ?? []).map((child) => (
                <div className="element">{child}</div>
              ))}
            </div>
          ))}
        </div>
      )}
      {question?.questionType === "table" && (
        <div className="tablet-container">
          <div className="column">
            {tableHeaders.map((headers, index) => (
              <div className="child head">{headers}</div>
            ))}
          </div>
          {rowData?.map((item, index) => (
            <div className="column">
              {item.map((tableData, index) => (
                <div className="child">{tableData}</div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionContainer;
