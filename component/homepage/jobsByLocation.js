import React from "react";
import { connect } from "react-redux";
import { globalLoaderFunc } from "../actions/commonActions";
import Head from "next/head";
import Link from "next/link";
import { MAIN_URL, PHP_APP_URL } from "../types/types";

const JobsByLocation = (props) => {
  return (
    <>
      <section className="search-bylocation">
        <div className="container-fluid text-center">
          <h2>
            Jobs Search by <span>Location</span>
          </h2>
          <ul>
            {props?.data?.data.map((data, index) => (
              <li key={index}>
                {data.is_external ? (
                  <a href={data.alias} target="_blank">
                    {data.city}
                  </a>
                ) : data.dynamic_route ? (
                  data?.level == 1 ? (
                    <Link href="/[dynamic]" as={`/${data.alias}`} key={index}>
                      <a>{data.city}</a>
                    </Link>
                  ) : data?.level === 2 ? (
                    <Link
                      href="/jobs/[jobsPosting]"
                      as={`/${data.alias}`}
                      key={index}
                    >
                      <a>{data.city}</a>
                    </Link>
                  ) : (
                    <Link
                      href="/jobs/[jobsPosting]/[index]"
                      as={`/${data.alias}`}
                      key={index}
                    >
                      <a>{data.city}</a>
                    </Link>
                  )
                ) : (
                  <Link href={`/${data.alias}`}>
                    <a>{data.city}</a>
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="text-right w-100 more-jobs">
            <Link
                href="/jobs-by-location"
                key="view-all-location"
              >
              <a> View More <i className="fa  fa-arrow-circle-right" /></a>
            </Link>
            {/* <a target="_blank" href={`${PHP_APP_URL}/jobs-by-location`}>
              View More<i className="fa  fa-arrow-circle-right" />
            </a>{" "} */}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(JobsByLocation);
