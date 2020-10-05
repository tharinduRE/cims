import React from 'react'

export default function SearchSubHeader() {
    return (
        <div className="subheader py-5 py-lg-10 gutter-b subheader-transparent" style={{
            backgroundColor:"#512788"
        }}>
                <div class="container d-flex flex-column">
								<div class="d-flex align-items-sm-end flex-column flex-sm-row mb-5">
									<h2 class="d-flex align-items-center text-white mr-5 mb-0">Search</h2>
									<span class="text-white opacity-60 font-weight-bold">Chemical Inventory </span>
								</div>
		
								<div class="d-flex align-items-md-center mb-2 flex-column flex-md-row">
									<div class="bg-white rounded p-4 d-flex flex-grow-1 flex-sm-grow-0">
										<form class="form d-flex align-items-md-center flex-sm-row flex-column flex-grow-1 flex-sm-grow-0">
											<div class="d-flex align-items-center py-3 py-sm-0 px-sm-3">
												
												<input type="text" class="form-control border-0 font-weight-bold pl-2" placeholder="Job Title" />
											</div>
											
											<span class="bullet bullet-ver h-25px d-none d-sm-flex mr-2"></span>
											<div class="d-flex align-items-center py-3 py-sm-0 px-sm-3">
												<span class="svg-icon svg-icon-lg">
													
												</span>
												<input type="text" class="form-control border-0 font-weight-bold pl-2" placeholder="Category" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-target="kt_searchbar_7_category-options" data-offset="0,10" readonly="readonly" />
												<div id="kt_searchbar_7_category-options" class="dropdown-menu dropdown-menu-sm">
													<div class="dropdown-item cursor-pointer">HR Management</div>
													<div class="dropdown-item cursor-pointer">Developers</div>
													<div class="dropdown-item cursor-pointer">Creative</div>
													<div class="dropdown-divider"></div>
													<div class="dropdown-item cursor-pointer">Top Management</div>
												</div>
											</div>
								
											<span class="bullet bullet-ver h-25px d-none d-sm-flex mr-2"></span>
											<div class="d-flex align-items-center py-3 py-sm-0 px-sm-3">
												<span class="svg-icon svg-icon-lg">
													
												</span>
												<input id="kt_subheader_7_location" type="text" class="form-control border-0 font-weight-bold pl-2" placeholder="Location" data-toggle="modal" aria-haspopup="true" aria-expanded="false" data-target="#subheader7Modal" readonly="readonly"/>
											</div>
											<button type="submit" class="btn btn-dark font-weight-bold btn-hover-light-primary mt-3 mt-sm-0 px-7">Search</button>
										</form>
									</div>
									<div class="mt-4 my-md-0 mx-md-10">
										<a href="#" class="text-white font-weight-bolder text-hover-primary">Advanced Search</a>
									</div>
								</div>
							</div>
        </div>
        
    )
}
