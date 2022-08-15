import React from "react";
import './paginado.css'

export const Paginado =({countries,countryPP,paginado,prevPage,handleNext,handlePrev,nextPage,currentPage})=>{
    const maximo = (countries/countryPP)+1
    const pageNumbers=[]
    for (let i = 0; i <Math.floor(maximo); i++) {
        pageNumbers.push(i+1)       
    }

    return(
        <nav>
            <div className="paginado">
                <span className="btnPage"//este es el indice de la pag 1
                    onClick={() => {paginado(pageNumbers[0]) }}>1</span>
                <button
                    className="btnpagina"
                    disabled={prevPage === 0 ? true : false}
                    onClick={handlePrev}>Prev</button>
                <span className=""
                > {currentPage} de {pageNumbers.length}</span>

                <button
                    className="btnpagina"
                    disabled={nextPage > pageNumbers.length ? true : false}
                    onClick={handleNext}>Next</button>
                <span className="btnPage"//este es el indice de la ultima pag
                    onClick={() => {paginado(pageNumbers.length) }}>{pageNumbers.length}</span>
            </div>
        </nav>
    )
}