import styled from 'styled-components'

export const EmptyPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  & > h1 {
    margin: 30px 0 20px;
  }

  & > p {
    font-size: 18px;
    margin: 0;
  }
`
