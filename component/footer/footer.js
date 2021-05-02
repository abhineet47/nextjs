import React from "react";
import { connect } from "react-redux";
import { globalLoaderFunc } from "../actions/commonActions";
import Head from "next/head";
import Link from "next/link";
import { MAIN_URL } from "../types/types";

const Footer = (props) => {
  return (
    <>
      <section>
        <footer>
          <div className="container-fluid">
            <div className="row">
              {props?.data?.blockLinks?.length > 0 &&
                props?.data?.blockLinks.map((data, index) => (
                  <div
                    className="col-md-3 col-sm-4 col-xs-6 pb-md-4 pb-3"
                    key={index}
                  >
                    <h5>{data?.title}</h5>
                    <ul>
                      {data?.links?.length > 0 &&
                        data?.links.map((dataInner, indexInner) => (
                          <li key={indexInner}>
                            {dataInner.is_external ? (
                              <a
                                href={dataInner.alias}
                                target="_blank"
                                key={index}
                              >
                                {dataInner.name}
                              </a>
                            ) : dataInner.dynamic_route ? (
                              dataInner?.level === 1 ? (
                                <Link
                                  href="/[dynamic]"
                                  as={`/${dataInner.alias}`}
                                  key={index}
                                >
                                  <a key={index}>{dataInner.name}</a>
                                </Link>
                              ) : dataInner?.level === 2 ? (
                                <Link
                                  href="/jobs/[jobsPosting]"
                                  as={`/${dataInner.alias}`}
                                  key={index}
                                >
                                  <a key={index}>{dataInner.name}</a>
                                </Link>
                              ) : (
                                <Link
                                  href="/jobs/[jobsPosting]/[index]"
                                  as={`/${dataInner.alias}`}
                                  key={index}
                                >
                                  <a key={index}>{dataInner.name}</a>
                                </Link>
                              )
                            ) : (
                              <Link href={`/${dataInner.alias}`} key={index}>
                                <a key={index}>{dataInner.name}</a>
                              </Link>
                            )}
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </footer>
        <div className="steacky">
          <div className="text-center connect">
            <h5>Connect with Us</h5>
            <ul className="list-inline social-links">
              <li className="social-1">
                <a
                  className="facebook"
                  href="https://www.facebook.com/TheIncircle"
                  target="_blank"
                >
                  <i className="fa fa-facebook" aria-hidden="true" />
                </a>
              </li>
              <li className="social-1">
                <a
                  className="twitter"
                  href="https://twitter.com/theincircle"
                  target="_blank"
                >
                  <i className="fa fa-twitter" aria-hidden="true" />
                </a>
              </li>
              <li className="social-1">
                <a
                  className="linkedin"
                  href="https://www.linkedin.com/company/the-incircle"
                  target="_blank"
                >
                  <i className="fa fa-linkedin" aria-hidden="true" />
                </a>
              </li>
              <li className="social-1">
                <a
                  className="insta"
                  href="https://www.instagram.com/theincircle"
                  target="_blank"
                >
                  <i className="fa fa-instagram" aria-hidden="true" />
                </a>
              </li>
              <li className="social-1">
                <a
                  className="pinterest"
                  href="https://www.pinterest.com/incirclethe"
                  target="_blank"
                >
                  <i className="fa fa-pinterest-p" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-link text-center">
            {props?.data?.theIncircle.length > 0 &&
              props?.data?.theIncircle.map((data, index) => (
                <React.Fragment key={index}>
                  {data.is_external ? (
                    <a href={data.alias} target="_blank" key={index}>
                      {data.name}
                    </a>
                  ) : (
                    <Link href={data.alias} key={index}>
                      <a key={index}>{data.name}</a>
                    </Link>
                  )}
                  {index < props?.data?.theIncircle.length - 1 && " | "}
                </React.Fragment>
              ))}
          </div>
          <div className="footer-note text-center">
            {props?.data?.copyright}
          </div>
        </div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" ></script>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" ></script>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
