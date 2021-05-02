import React from "react";
import { connect } from "react-redux";
import { globalLoaderFunc } from "../actions/commonActions";
import Head from "next/head";
import Link from "next/link";
import { MAIN_URL, PHP_APP_URL } from "../types/types";

const JobsCorporate = (props) => {
  return (
    <>
      <section className="corporate">
        <div className="container-fluid">
          <div className="corporate-jobs row">
            <div className="col-sm-5 col-md-5">
              <img
                src="/assets/img/job-banner.jpg"
                alt="migrant labour"
                className="img-100"
              />
            </div>
            <div className="col-sm-7 col-md-7 ">
              <h2>{props?.data?.heading}</h2>
              {/*<p>{props?.data?.description}</p>*/}
              <ul>
                {props?.data?.data.map((data, index) => (
                  <li key={index}>
                    <div>
                      {data.is_external ? (
                        <a href={data.alias} target="_blank">
                          {data.name}
                        </a>
                      ) : data.dynamic_route ? (
                        data?.level == 1 ? (
                          <Link
                            href="/[dynamic]"
                            as={`/${data.alias}`}
                            key={index}
                          >
                            <a>{data.name}</a>
                          </Link>
                        ) : data?.level === 2 ? (
                          <Link
                            href="/jobs/[jobsPosting]"
                            as={`/${data.alias}`}
                            key={index}
                          >
                            <a>{data.name}</a>
                          </Link>
                        ) : (
                          <Link
                            href="/jobs/[jobsPosting]/[index]"
                            as={`/${data.alias}`}
                            key={index}
                          >
                            <a>{data.name}</a>
                          </Link>
                        )
                      ) : (
                        <Link href={`/${data.alias}`}>
                          <a>{data.name}</a>
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="text-right more-jobs">
                <a target="_blank" href={`${PHP_APP_URL}/jobs-by-designation`}>
                  View More <i className="fa  fa-arrow-circle-right" />
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(JobsCorporate);
