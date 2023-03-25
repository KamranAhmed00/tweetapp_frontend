import React from 'react'
import { Button } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export const Paginations = (props) => {
  let pages = [];
  for (let i = 1; i <= props.totalPages; i++) {
    pages.push(i);
  }
  return (
    <div>
      <Pagination style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }} className="">
        {/* <PaginationItem>
    <PaginationLink
      first
      href=""
    />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink
      href="#"
      previous
    />
    </PaginationItem> */}
        {
          pages.map((page, index) => {
            // <Button key={index} onClick={()=>props.pageNumber(index)}>{page}</Button>
            return <PaginationItem key={index} onClick={() => props.pageNumber(index)}>
              <PaginationLink href="#">
                {page}
              </PaginationLink>
            </PaginationItem>
          })
        }

        {/* <PaginationItem>
    <PaginationLink
      href="#"
      next
    />
  </PaginationItem>
  <PaginationItem>
    <PaginationLink
      href="#"
      last
    />
  </PaginationItem> */}
      </Pagination>
    </div>
  )
}

