import { VirtuosoGrid } from 'react-virtuoso';
import styled from '@emotion/styled';
import DefaultGridItem from './GridItem';

const ItemContainer = styled.div`
  padding: 0.5rem;
  width: 22%;
  display: flex;
  flex: none;
  align-content: stretch;

  @media (max-width: 1350px) {
    width: 45%;
  }

  @media (max-width: 600px) {
    width: 95%;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -8px;
  margin-right: -8px;
`;

export default function GridTable({ data, height, GridItem = DefaultGridItem, scrollElement = undefined }) {
  return (
    <VirtuosoGrid
      customScrollParent={scrollElement}
      totalCount={data.length}
      style={{ overflowX: 'hidden', height: scrollElement ? undefined : height }}
      components={{
        Item: ItemContainer,
        List: ListContainer as any,
        ScrollSeekPlaceholder: () => (
          <ItemContainer>
            <GridItem>--</GridItem>
          </ItemContainer>
        )
      }}
      itemContent={index => {
        return <GridItem index={index} {...data[index]} />;
      }}
    />
  );
}
