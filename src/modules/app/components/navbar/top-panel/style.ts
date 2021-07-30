import styled from 'styled-components'

export const TopPanelCont = styled.div`
  padding-right: 10px;
  display: flex;
  justify-content: flex-end;
  /* height: 80px; */
  height: 60px;
  align-items: center;
  /* background-color:#FFFFFF; */
  background-color: #f6f6f6;
  padding: 8px 16px;
  padding-right: 36px;
  box-sizing: border-box;
  /* position: fixed; */
  /* position: -webkit-sticky;
  position: sticky; */
  width: calc(100vw - 208px);
  z-index: 999;
  @media (max-width: 768px) {
    width: calc(100vw - 48px);
  }
`
