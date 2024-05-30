const transactionController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ where: { email: email } });
    if (user) throw new Error("Already register");
    const hashedPassword = await hashPassword(password);
    req.body.password = hashedPassword;
    let info = {
      name: req.body.name,
      code_refferal: `SEQ-${generateRandomId(4)}`,
      email: req.body.email,
      password: req.body.password,
    };

    const product = await User.create(info);

    const templatePath = path.join(
      __dirname,
      "../templates",
      "templateEmail.hbs"
    );
    const templateSource = await fs.promises.readFile(templatePath, "utf8");
    const compileTemplate = Handlebars.compile(templateSource);
    const html = compileTemplate({
      name: name,
    });

    await transporter.sendMail({
      from: "sender",
      to: email,
      subject: "Verification your email",
      html,
    });

    const oneMinuteFromNow = new Date(Date.now() + 1 * 60 * 1000);
    const scheduledTask = scheduler.scheduleJob(oneMinuteFromNow, async () => {
      try {
        const info = {
          status: "no_verified",
          code_refferal: `SEQ-${generateRandomId(4)}`,
        };
        let userData = await User.findOne({ where: { email: email } });
        if (userData?.status === "pending") {
          await User.update(info, { where: { id: userData.id } });
          console.log("Try again, your account hasn't been verified yet");
        }
        if (userData.status === "verified") {
          scheduledTask.cancel();
          console.log("Your account is verified");
        }
      } catch (error) {
        console.log(error);
      }
    });

    res.send(
      response(
        200,
        product,
        "Success Register check your email for verified you account"
      )
    );

    console.log(product);
  } catch (error) {
    throw error;
  }
};
