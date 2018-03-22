const PlanetWrapper = styled.div`
    width: 100px;
    height : 140px;
    flex: 0 0 20%;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    align-items: center;
    margin-bottom : 30px;
    transition : all 0.3s ease-in;
    .name{
      padding-top : 10px;
      font-weight : bold;
      white-space: nowrap;
      text-overflow : ellipsis;
      max-width : 100%;
      font-size : 10px;
    }
`

export default PlanetWrapper;