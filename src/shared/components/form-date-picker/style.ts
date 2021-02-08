import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
export const StyledDatePicker = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 10px;

    input {
      border-radius: 4px;
      border: 1px solid;
      border-color: ${colors.primary};
      padding: 18px 26px;
      font-size: 18px;
      font-size: 14px;
      line-height: 26px;
      color: ${colors.textPrimary};
      font-family: NunitoRegular;
      outline: none;
      border: 1px solid rgb(240, 243, 244);
      background: ${colors.white};
    }
  }
  .react-datepicker__header__dropdown {
    margin: 10px;
  }
`
export const CalenderImg = styled.div`
  display: flex;
  justify-content: flex-end;
  img {
    margin-right: 20px;
    margin-bottom: -63px;
    z-index: 1;
    cursor: pointer;
  }
`
export const err = styled.p`
  color: red;
  font-size: 12px;
  margin: -10px 0 1rem 5px;
  font-family: Light;
  text-align: left;
  font-family: NunitoRegular;
`
