import styled from 'styled-components'

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`

export const ID = styled.td`
    background-color: ${({color})=> color!=='none' ? '#fff' : '#cae3ff'};
    font-weight: ${({color})=> color!=='none' ? 'auto' : 'bold'};
    position: sticky;
    left: 0;
    padding: ${({color})=> color!=='none' ? '0' : '1rem'};
`

export const Head = styled.thead`
    background-color: #cae3ff;
    position: sticky;
    z-index: 1;
    top: 0;
`

export const Edit = styled.td`
    background-color: ${({color})=> color!=='none' ? '#fff' : '#cae3ff'};
    font-weight: ${({color})=> color!=='none' ? 'auto' : 'bold'};
    position: sticky;
    right: 0;
    width: ${({width})=>width};
    text-align: ${({a})=>a};
    padding: ${({active, color})=>active && color ? "1rem 3.31rem" : "1rem"};
`