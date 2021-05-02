import React from "react";
import { connect } from "react-redux";
import { globalLoaderFunc } from "../actions/commonActions";
import Head from "next/head";
import Link from "next/link";
import { MAIN_URL } from "../types/types";

const JobsArea = (props) => {
  return (
    <>
      <section className="jobs-area">
        <div className="container-fluid">
          <h2>{props?.data?.heading}</h2>
          <div className="jobs-area-link row">
            {props?.data?.data.map((data, index) => (
              <div className="col-6 col-sm-3" key={index}>
                {data.is_external ? (
                  <a href={data.alias} target="_blank">
                    <span>
                      <img alt={data.name} src={`${MAIN_URL}${data.icon}`} />
                    </span>
                    {data.name}
                    <span>Vacancy:{data.vacancy}</span>
                  </a>
                ) : data.dynamic_route ? (
                  data?.level == 1 ? (
                    <Link href="/[dynamic]" as={`/${data.alias}`} key={index}>
                      <a>
                        <span>
                          <img
                            alt={data.name}
                            src={`${MAIN_URL}${data.icon}`}
                          />
                        </span>
                        {data.name}
                        <span>Vacancy:{data.vacancy}</span>
                      </a>
                    </Link>
                  ) : data?.level === 2 ? (
                    <Link
                      href="/jobs/[jobsPosting]"
                      as={`/${data.alias}`}
                      key={index}
                    >
                      <a>
                        <span>
                          <img
                            alt={data.name}
                            src={`${MAIN_URL}${data.icon}`}
                          />
                        </span>
                        {data.name}
                        <span>Vacancy:{data.vacancy}</span>
                      </a>
                    </Link>
                  ) : (
                    <Link
                      href="/jobs/[jobsPosting]/[index]"
                      as={`/${data.alias}`}
                      key={index}
                    >
                      <a>
                        <span>
                          <img
                            alt={data.name}
                            src={`${MAIN_URL}${data.icon}`}
                          />
                        </span>
                        {data.name}
                        <span>Vacancy:{data.vacancy}</span>
                      </a>
                    </Link>
                  )
                ) : (
                  <Link href={`/${data.alias}`}>
                    <a>
                      <span>
                        <img alt={data.name} src={`${MAIN_URL}${data.icon}`} />
                      </span>
                      {data.name}
                      <span>Vacancy:{data.vacancy}</span>
                    </a>
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="text-right more-jobs d-none d-sm-block">
            <a href="/latest-jobs">
              View More <i className="fa fa-arrow-circle-right" />
            </a>{" "}
          </div>
          {/* <div className="text-right more-jobs d-none d-sm-block"><a href="#">View More <i className="fa  fa-arrow-circle-right" /></a> </div> */}
        </div>
      </section>{" "}
    </>
  );
};

const mapStateToProps = (state) => ({
  currentClassData: state.product.currentJobData,
  classId: state.product.classId,
  classType: state.product.classType,
});

const mapDispatchToProps = (dispatch) => ({
  handleLoader: (data) => dispatch(globalLoaderFunc(data)),
  currentClassDetails: (data, classId, classType) =>
    dispatch(currentClassDetails(data, classId, classType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobsArea);
