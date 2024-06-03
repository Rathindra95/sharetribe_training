import React from "react";
import classNames from "classnames";
import { injectIntl } from "react-intl";
import { compose } from "redux";

export const EditListingExtraFeaturesFormComponent = (props) => (
    <FinalForm
        {...props}
        render={formRenderProps => {
            const {
                formId,
                autoFocus,
                className,
                disabled,
                ready,
                handleSubmit,
                intl,
                invalid,
                pristine,
                saveActionMsg,
                updated,
                updateInProgress,
                fetchErrors,
            } = formRenderProps;

            const classes = classNames(css.root, className);
            const submitReady = (updated && pristine) || ready;
            const submitInProgress = updateInProgress;
            const submitDisabled = invalid || disabled || submitInProgress;
            const { updateListingError, showListingsError } = fetchErrors || {};

            return (
                <Form onSubmit={handleSubmit} className={classes}>
                    {updateListingError ? (
                        <p className={css.error}>
                            <FormattedMessage id="EditListingExtraFeaturesForm.updateFailed" />
                        </p>
                    ) : null}
                    {showListingsError ? (
                        <p className={css.error}>
                            <FormattedMessage id="EditListingExtraFeaturesForm.showListingFailed" />
                        </p>
                    ) : null}
                    <FieldTextInput
                        id={`${formId}extraFeatures`}
                        name="extraFeatures"
                        className={css.input}
                        autoFocus={autoFocus}
                        type="textarea"
                        label="Extra features"
                        placeholder={intl.formatMessage({ id: 'EditListingExtraFeaturesForm.extraFeaturesInputPlaceholder' })}
                    />

                    <Button
                        className={css.submitButton}
                        type="submit"
                        inProgress={submitInProgress}
                        disabled={submitDisabled}
                        ready={submitReady}
                    >
                        {saveActionMsg}
                    </Button>
                </Form>
            );
        }}
    />
);

export default compose(injectIntl) (
    EditListingExtraFeaturesFormComponent
);