import React from "react";
import * as Styled from "./style";

interface NavTabProps {
  tabs?: string[];
  activeTab?: number;
  onTabClick?: (tabNumber: number) => void;
}

export function NavTab({
  tabs = ["test1", "test2", "test3"],
  activeTab = 1,
  onTabClick = () => {},
}: NavTabProps) {
  const handleTabClick = (tabNumber: number) => {
    onTabClick(tabNumber);
  };

  return (
    <Styled.All>
      <Styled.NavTab>
        {tabs.map((tab, index) => (
          <React.Fragment key={index}>
            <Styled.Tab
              onClick={() => handleTabClick(index + 1)}
              isActive={index + 1 === activeTab}
            >
              {tab}
            </Styled.Tab>
            {index < tabs.length - 1 && <Styled.Separator />}
          </React.Fragment>
        ))}
      </Styled.NavTab>
    </Styled.All>
  );
}
